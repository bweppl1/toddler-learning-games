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

const router = express.Router();

// Authentication routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Points routes
router.get("/points", getAllUserPoints);

// Get specific game points
router.get("/points/math", getMathPoints);
router.get("/points/typing", getTypingPoints);
router.get("/points/spelling", getSpellingPoints);

// Update specific game points
router.patch("/points/math", updateMathPoints);
router.patch("/points/typing", updateTypingPoints);
router.patch("/points/spelling", updateSpellingPoints);

// Reset all points
router.patch("/points/reset", resetUserPoints);

export default router;
