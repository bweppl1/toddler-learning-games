import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";
import {
  getAllUserPoints,
  getMathPoints,
  getTypingPoints,
  getSpellingPoints,
  updateMathPoints,
  updateTypingPoints,
  updateSpellingPoints,
  resetUserPoints,
} from "../controllers/pointController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// Authentication routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Points routes (with auth middleware)
router.get("/points", requireAuth, getAllUserPoints);

// Get specific game points (with auth middleware)
router.get("/points/math", requireAuth, getMathPoints);
router.get("/points/typing", requireAuth, getTypingPoints);
router.get("/points/spelling", requireAuth, getSpellingPoints);

// Update specific game points (with auth middleware)
router.patch("/points/math", requireAuth, updateMathPoints);
router.patch("/points/typing", requireAuth, updateTypingPoints);
router.patch("/points/spelling", requireAuth, updateSpellingPoints);

// Reset all points (with auth middleware)
router.patch("/points/reset", requireAuth, resetUserPoints);

export default router;
