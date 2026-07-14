import { connectDB } from "./src/config/database";
import app from "./src/app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});