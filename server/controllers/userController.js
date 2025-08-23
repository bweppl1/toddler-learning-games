import User from "../models/User";
import mongoose from "mongoose";

//login user
export const loginUser = async (req, res) => {
  res.json({ message: "Login User" });
};

//sign up
export const signupUser = async (req, res) => {
  res.json({ message: "Signup User" });
};
