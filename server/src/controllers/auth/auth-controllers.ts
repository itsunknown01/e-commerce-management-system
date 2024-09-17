import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { LoginSchema, RegisterSchema } from "../../schemas";
import { db } from "../../services/db";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const validation = RegisterSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name, email, password } = validation.data;

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log("REGISTER API ERROR", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validation = LoginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { email, password } = validation.data;

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return res.status(401).json({ message: "Email does not exists" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
      const accessToken = jwt.sign(
        { "email": existingUser.email },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { "email": existingUser.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "30d" }
      );

      const loggedUser = await db.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          token: refreshToken,
        },
      });

      res.cookie("refresh", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 *24 * 60 * 60 * 1000
      });

      const userInfo = {
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
        image: loggedUser.image,
        role: loggedUser.role
      }

      return res.status(200).json({
        message: "Login Successful",
        accessToken,
        userInfo
      });
    }
  } catch (error) {
    console.log("LOGIN API ERROR", error);
  }
};
