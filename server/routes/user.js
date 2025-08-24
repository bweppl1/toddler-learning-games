import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

// login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

export default router;
