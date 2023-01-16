const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { authenticate } = require("./middlewares/authentication.middleware");
const { postRouter } = require("./routes/post.route");
const { userRouter } = require("./routes/user.route");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}))

app.use(express.json());

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Social Media App");
})


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Database Connected on port ${process.env.PORT}`);
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Database Connected on port ${process.env.PORT}`);
})