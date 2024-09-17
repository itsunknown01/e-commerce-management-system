import * as express from "express-serve-static-core";
import { UserRole } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
