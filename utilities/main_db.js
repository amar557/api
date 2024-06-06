import mongoose from "mongoose";
// const URI = process.env.MONGODB_URI;
const URI = "mongodb://127.0.0.1:27017/mern_app";

const connectDB = async () => {
  try {
    mongoose.connect(URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
export { connectDB };
