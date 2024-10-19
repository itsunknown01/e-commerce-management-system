import { NextFunction, Response } from "express";
import { IUserRole } from "../types";
import { IRequest } from "../types/custom";

export const adminAccessMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== IUserRole.ADMIN) {
    return res.sendStatus(403);
  }
  next();
};
