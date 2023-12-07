import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Define the root route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the e-commerce app</h1>");
});

// Define the PORT
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  const mode = process.env.DEV_MODE || "development";
  console.log(`Server is running in ${mode} mode on port ${PORT}`.bgCyan.white);
});
