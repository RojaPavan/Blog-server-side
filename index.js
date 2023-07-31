import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.use(cors());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Blog Writing Application</h1>");
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(
      PORT,
      console.log(`Server is running in: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(`Something went wrong. ErrorMsg: ${err}`));
