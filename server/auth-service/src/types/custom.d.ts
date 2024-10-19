import { Request } from "express";
import { IUser } from ".";

export interface IRequest extends Request {
    user?: IUser
}
