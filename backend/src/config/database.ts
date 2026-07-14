import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
    // status code 1 means failure and 0 means success
  }
};
