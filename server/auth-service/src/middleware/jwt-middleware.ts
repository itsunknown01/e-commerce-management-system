import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, IUserRole } from "../types";
import { IRequest } from "../types/custom";
import dotenv from "dotenv";
import User from "../models";

dotenv.config();

interface DecodedToken {
  email: string;
}

export default function JWTMiddleware(
  req: IRequest,
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

        const existingUser: IUser | null = await User.findOne({ email: decodedToken.email });

        if (!existingUser) return res.sendStatus(404);

        req.user = {
          _id: existingUser?._id,
          name: existingUser?.name,
          email: existingUser?.email,
          role: existingUser?.role,
          image: existingUser?.image,
        };
        next();
      }
    );
  } catch (error) {
    console.error(error);
  }
}
