import mongoose, { model } from "mongoose";

const services = mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  image: String,
  category: String,
});
const serviceSchema = new model("service", services);
export { serviceSchema };
