import env from "dotenv";
import handleErrors from "./vilidators/error-handler.js";
import cors from "cors";
import path from "path";
env.config();
import express from "express";
import router from "./router/route.js";
import { connectDB } from "./utilities/main_db.js";
const server = express();
const corsPolicies = {
  origin: "http://localhost:5173",
  methods: "POST , GET ,PUT,PATCH,DELETE",
  credentials: true,
};
server.get("/", (req, res) => {
  server.use(express.static(path.resolve(__dirname, "client", "dist")));
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

server.use(cors());
server.use(express.json());
const port = 4000;
server.use("/", router);
server.use(handleErrors);
connectDB().then(() => {
  server.listen(4000);
});
