import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  console.log(process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
    // status code 1 means failure and 0 means success
  }
};
