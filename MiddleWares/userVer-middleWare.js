import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";
export const checkIsauthorized = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);
  if (!token) {
    // console.log(token);
    console.log(token);
    res.status(401).send({ message: "token is not autherized ", token });
  } else {
    const user2 = jwt.verify(token, "secretkeyisgivenbyamar");
    const d = await User.findOne({ email: user2.email }).select({
      password: 0,
    });
    // console.log(req.header());
    req.user = d;
    req.token = token;
    req.usedId = d._id;
    next();
  }
};
