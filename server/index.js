const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

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
app.use("/api/user", userRoute);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.status(200).json("running on port 8800");
});

const server = app.listen(process.env.PORT || 8800, () =>
  console.log(`Server started on 8800`)
);
