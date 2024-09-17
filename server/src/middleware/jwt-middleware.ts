import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { db } from "../services/db";

config();

interface DecodedToken {
  email: string;
}

export default function JWTMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const accessToken = authHeader.split(" ")[1];

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const decodedToken = decoded as DecodedToken;

        const existingUser = await db.user.findUnique({
          where: { email: decodedToken.email },
        });

        if (!existingUser) return res.sendStatus(404);

        
        req.user = {
          id: existingUser?.id,
          name: existingUser?.name,
          email: existingUser?.email,
          role: existingUser?.role,
          image: existingUser?.image,
        };
        
        // if (req.params.storeId !== undefined) {
        //   const { storeId } = req.params;
        //   console.log(storeId, "params");
        //   req.params.storeId = storeId;
        // }

        next();
      }
    );
  } catch (error) {
    console.error(error);
  }
}
