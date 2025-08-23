import express from "express";
import { loginUser, signupUser } from "../controllers/userController";

const router = express.Router();

// login
router.post("/login", (req, res) => {});

// sign up

router.post("/signup", (req, res) => {});

export default router;
