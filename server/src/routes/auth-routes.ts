import express from "express";
import { login, register } from "../controllers/auth/auth-controllers";
// import { getUsersById } from "../controllers/auth/users-controllers";

const router = express.Router();

// router.get("/users", getUsersById);
router.post("/register", register)
router.post("/login",login)

export default router;