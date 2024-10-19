import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const url = process.env.MONGO_DB_URL as string;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

export default mongoose;