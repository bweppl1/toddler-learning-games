import User from "../models/User.js";

// Get all user points -- may not need but could implement with achievements later
export const getAllUserPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("points");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      points: user.points,
      totalPoints:
        user.points.mathPoints +
        user.points.typingPoints +
        user.points.spellingPoints,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get math points
export const getMathPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("points.mathPoints");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ mathPoints: user.points.mathPoints });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get typing points
export const getTypingPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("points.typingPoints");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ typingPoints: user.points.typingPoints });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get spelling points
export const getSpellingPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("points.spellingPoints");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ spellingPoints: user.points.spellingPoints });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update math points
export const updateMathPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const { points } = req.body;

    if (typeof points !== "number" || points < 0) {
      return res
        .status(400)
        .json({ error: "Points must be a positive number" });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { $inc: { "points.mathPoints": points } },
      { new: true, select: "points.mathPoints" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Math points updated successfully",
      mathPoints: user.points.mathPoints,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update typing points
export const updateTypingPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const { points } = req.body;

    if (typeof points !== "number" || points < 0) {
      return res
        .status(400)
        .json({ error: "Points must be a positive number" });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { $inc: { "points.typingPoints": points } },
      { new: true, select: "points.typingPoints" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Typing points updated successfully",
      typingPoints: user.points.typingPoints,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update spelling points
export const updateSpellingPoints = async (req, res) => {
  try {
    const { _id } = req.user;
    const { points } = req.body;

    if (typeof points !== "number" || points < 0) {
      return res
        .status(400)
        .json({ error: "Points must be a positive number" });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { $inc: { "points.spellingPoints": points } },
      { new: true, select: "points.spellingPoints" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Spelling points updated successfully",
      spellingPoints: user.points.spellingPoints,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reset all user points
export const resetUserPoints = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(
      _id,
      {
        "points.mathPoints": 0,
        "points.typingPoints": 0,
        "points.spellingPoints": 0,
      },
      { new: true, select: "points" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "All points reset successfully",
      points: user.points,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
