import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(config.MONGODB_URI);
    console.log("MongoDB connected:", connect.connection.host);
  } catch (err: any) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
export default connectDB;
//adsf