import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
// import routes

// express
const app = express();
const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/toddler-learning-games";

// connect to DB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Only start server after DB connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// middleware
app.use(cors());
app.use(express.json());

// routes
//app.use("route address", route name)
app.use("/api/user", userRoutes);
