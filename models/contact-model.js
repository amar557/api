import mongoose, { model } from "mongoose";

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});
const contacts = mongoose.model("contact", contactSchema);
export { contacts };
