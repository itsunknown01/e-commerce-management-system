import { Response } from "express";
import User from "../models";
import { IUserRole } from "../types";
import { IRequest } from "../types/custom";

class UserController {
  async fetchAllUsers(req: IRequest, res: Response) {
    try {
      const isAdmin = req.user?.role === IUserRole.ADMIN;

      if (!isAdmin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const users = await User.find();

      return res.status(200).json({ users });
    } catch (error) {
      console.log("Error in All Users API", error);
    }
  }
}

export default new UserController()