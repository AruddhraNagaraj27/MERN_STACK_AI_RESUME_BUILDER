import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";   
import resumeRouter from "./routes/resumeRoutes.js";
import ImageKit from "@imagekit/nodejs";
import aiRouter from "./routes/aiRoutes.js";
connectDB();

const app = express();
app.use(express.json());

// Configure CORS to allow Authorization header
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.get('/', (req, res)=> res.send("Server is live..."))
app.use("/api/users", userRouter);
app.use("/api/resumes",resumeRouter)
app.use('/api/ai', aiRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
