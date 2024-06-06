import express from "express";
import { validate } from "../vilidators/middleware-validation.js";
import {
  validationSchema,
  loginValidateSchema,
} from "../vilidators/form-validator.js";
import { checkIsauthorized } from "../MiddleWares/userVer-middleWare.js";
import {
  contactHandler,
  servicesData,
  home,
  login,
  register,
  user,
  usersData,
  ContactsData,
  deleteUser,
  deleteContact,
  findUser,
  updateUser,
} from "../controlers/auth-controler.js";
import { emailVerify } from "../MiddleWares/AdminVerify.js";

const router = express.Router();
router.get("/", home);
router.route("/register").post(validate(validationSchema), register);
router.route("/login").post(validate(loginValidateSchema), login);
router.route("/form").post(contactHandler);
router.route("/user").get(checkIsauthorized, user);
router.route("/services").get(servicesData);
router.route("/users").get(checkIsauthorized, emailVerify, usersData);
router.route("/contacts").get(checkIsauthorized, emailVerify, ContactsData);
router
  .route("/deleteuser/:id")
  .delete(checkIsauthorized, emailVerify, deleteUser);
router
  .route("/deletecontact/:id")
  .delete(checkIsauthorized, emailVerify, deleteContact);

router.route("/finduser/:id").get(checkIsauthorized, emailVerify, findUser);
router
  .route("/updateusers/:id")
  .patch(checkIsauthorized, emailVerify, updateUser);
export default router;
