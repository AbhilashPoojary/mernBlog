const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const loginRoute = require;

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoDB");
  }
);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.status(200).json("running on port 8800");
});

const server = app.listen(process.env.PORT || 8800, () =>
  console.log(`Server started on 8800`)
);
