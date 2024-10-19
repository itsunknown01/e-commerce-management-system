import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { LoginSchema, RegisterSchema } from "../lib/schema";
import User from "../models";
import { IUser } from "../types";

dotenv.config()

class AuthController {
  async loginHandler(req: Request, res: Response) {
    try {
      const validation = LoginSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ message: "Invalid Fields" });
      }

      const { email, password } = validation.data;

      const existingUser: IUser | null = await User.findOne({ email });

      if (!existingUser || !existingUser.email || !existingUser.password) {
        return res.status(401).json({ message: "Email does not exists" });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (isMatch) {
        const accessToken = jwt.sign(
          { email: existingUser.email },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
          { email: existingUser.email },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: "30d" }
        );

        const loggedUser: IUser | null = await User.findByIdAndUpdate(existingUser._id,{
            token: refreshToken
        });

        res.cookie("refresh", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        const userInfo = {
          id: loggedUser!._id,
          name: loggedUser!.name,
          email: loggedUser!.email,
          image: loggedUser!.image,
          role: loggedUser!.role,
        };

        return res.status(200).json({
          message: "Login Successful",
          accessToken,
          userInfo,
        });
      }
    } catch (error) {
      console.log("LOGIN API ERROR", error);
    }
  }

  async register(req: Request, res: Response) {
    try {
        const validation = RegisterSchema.safeParse(req.body);
    
        if (!validation.success) {
          return res.status(400).json({ message: "Invalid Fields" });
        }
    
        const { name, email, password } = validation.data;
    
        const existingUser:IUser | null = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        if (hashedPassword) {
          await User.create({
            name,
            email,
            password: hashedPassword
          });
    
          return res.status(200).json({ message: "User created successfully" });
        }
      } catch (error) {
        console.log("REGISTER API ERROR", error);
      }
  }

  async refresh(req: Request,res: Response) {
    try {
      const cookies = req.cookies;
  
      if (!cookies) return res.sendStatus(401);
  
      const refreshToken = cookies.refresh;
  
      const existingUser: IUser | null = await User.findOne({token: refreshToken});
  
      if (!existingUser) return res.sendStatus(403);
  
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: any, decoded: any) => {
          if (err || existingUser.email !== decoded.email)
            return res.sendStatus(403);
  
          const accessToken = jwt.sign(
            { email: decoded.email },
            process.env.ACCESS_TOKEN_SECRET as string,
            {
              expiresIn: "1d",
            }
          );
  
          const userInfo = {
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
          };
          
          return res.json({ accessToken, userInfo });
        }
      );
    } catch (error) {
      console.log("REFRESH_API_ERROR", error);
    }
  }
}

export default new AuthController();