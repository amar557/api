import env from "dotenv";
import handleErrors from "./vilidators/error-handler.js";
import cors from "cors";
env.config();
import express from "express";
import router from "./router/route.js";
import { connectDB } from "./utilities/main_db.js";
const server = express();

server.use(cors());
server.use(express.json());
const port = 4000;
server.use("/", router);
server.use(handleErrors);
connectDB().then(() => {
  server.listen(4000);
});
