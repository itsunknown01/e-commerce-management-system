import express, { RequestHandler } from "express";

import AuthController from "../controllers/auth-controller";
import UserController from "../controllers/users-controller";
import JWTMiddleware from "../middleware/jwt-middleware";
import { adminAccessMiddleware } from "../middleware/role-access";

const router = express.Router({mergeParams: true});

router.post("/register", AuthController.register as RequestHandler);
router.post("/login", AuthController.loginHandler as RequestHandler);

router.get("/refresh", AuthController.refresh as RequestHandler);

router.get(
  "/users",
  JWTMiddleware as RequestHandler,
  adminAccessMiddleware as RequestHandler,
  UserController.fetchAllUsers as express.RequestHandler
);

export default router;
