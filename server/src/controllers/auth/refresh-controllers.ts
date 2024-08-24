import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { db } from "../../services/db";

dotenv.config();

export const handleRefresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies) return res.sendStatus(401);

    const refreshToken = cookies.refresh;

    const existingUser = await db.user.findFirst({
      where: {
        token: refreshToken,
      },
    });

    if (!existingUser) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err || existingUser.email !== decoded.email)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: "1d",
          }
        );

        return res.json({accessToken})
      }
    );
  } catch (error) {
    console.log("REFRESH_API_ERROR", error);
  }
};