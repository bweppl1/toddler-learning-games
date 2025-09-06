import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      username: user.username,
      token,
      _id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sign up
export const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      username: user.username,
      token,
      _id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
