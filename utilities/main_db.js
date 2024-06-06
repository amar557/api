import mongoose from "mongoose";
import "dotenv/config";
// const URI = process.env.MONGODB_URI;
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose.connect(URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
export { connectDB };
