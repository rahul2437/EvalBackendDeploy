const express = require("express");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

// userRouter.get("/", async (req, res) => {
//   const allUsers = await User.find();
//   console.log(allUsers);
//   res.send("allUsers");
// });

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    let data = await User.find({ email });
    if (data.length === 0) {
      bcrypt.hash(password, 5, async (err, encrypted) => {
        if (err) {
          console.log(err);
        } else {
          const user = new User({ name, email, gender, password: encrypted });
          await user.save();
          res.send("User registered Successfully");
        }
      });
    } else {
      res.send("User Already exists");
    }
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      let user = await User.find({ email });
      console.log(user);
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign({ type: "social login" }, "rahul1");
            res.send({ message: "Logged in", token });
          } else {
            res.send("Invalid Credentials");
          }
        });
      } else {
        res.send("Invalid Credentials");
      }
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.send("Please fill all the feilds");
  }
})

module.exports = { userRouter };