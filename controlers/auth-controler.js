import { User } from "../models/usermodel.js";
// import contactModel from "../models/contact-model.js";
import bcrypt from "bcryptjs";
import { serviceSchema } from "../models/Services-model.js";
import { contacts } from "../models/contact-model.js";

const home = (req, res) => {
  try {
    res.send("hi there from home controller");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(500).send({ message: "user Alredy exist" });
    } else {
      const encpass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        phone,
        password: encpass, // Store the hashed password
      });
      res.status(201).send({
        message: "User created successfully",
        userId: newUser._id.toString(),
        token: await newUser.generateToken(),
      });
    }
  } catch (error) {
    console.error("Error during registration:", error.errmsg);
    res.status(500).send("user already exist");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      let isPassword = await bcrypt.compare(password, userExist.password);
      if (!isPassword) {
        return res.status(500).send({ message: "password is incorrect" });
      } else {
        return res.status(200).send({
          msg: "password is correct",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      }
    } else {
      return res.status(500).send({ message: "user not found" });
    }
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(500).send(error);
    // console.log(error);
  }
};

const contactHandler = async (req, res) => {
  try {
    const { username, message, email } = req.body;
    await contacts.create({ username, message, email });
    res.send({ username, message, email });
  } catch (error) {
    res.send({ error });
  }
};

const user = (req, res, next) => {
  const data = req.user;
  res.send({ data });
};
const servicesData = async (req, res, next) => {
  const servicesData = await serviceSchema.find();
  res.status(201).json({ servicesData });
};

const usersData = async (req, res, next) => {
  try {
    const usersData = await User.find({}, { password: 0 });
    res.status(200).send(usersData);
  } catch (error) {
    res.send(error);
  }
};

const ContactsData = async (req, res, next) => {
  try {
    const contactsData = await contacts.find();
    res.status(200).send(contactsData);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
  // user.deleteOne();
};

const deleteContact = async (req, res, next) => {
  try {
    const y = await contacts.deleteOne({ _id: req.params.id });
    res.send({ y });
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  const user = await User.findOne({ _id: id }, { isAdmin: 0, password: 0 });
  res.status(200).send({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  const updatedData = req.body;
  // console.log(req.body);
  const user = await User.updateOne(
    { _id: id },
    {
      $set: updatedData,
    }
  );
  res.status(200).send(user);
};

export {
  updateUser,
  findUser,
  deleteContact,
  deleteUser,
  home,
  register,
  login,
  contactHandler,
  user,
  servicesData,
  usersData,
  ContactsData,
};
