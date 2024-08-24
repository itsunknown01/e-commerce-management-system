import { UserRole } from "@prisma/client";
import * as expressSession from "express-session"

interface User {
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
  accessToken: string;
}

declare module 'express-session' {
    interface SessionData {
      user: User
    }
  }