import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/routes.js";
import bodyParser from "express";
import dotenv from "dotenv";

dotenv.config();
export const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

app.use("/", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
