import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import routes

// listen to port
const port = process.env.PORT;

// express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
//app.use("route address", route name)

// connect to DB
// mongoose code
