import dotenv from "dotenv";

dotenv.config();
const config = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
export default config;
