const express = require("express");
const jwt = require("jsonwebtoken");
const { Post } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const filter = {};
  const { device, device1, device2 } = req.query;
  if (device) {
    filter.device = device;
  }
  if (device1 && device2) {
    filter.$or = [{ "device": device1 }, { "device": device2 }]
  }
  const token = req.headers.authorization;
  jwt.verify(token, "rahul1", async (err, result) => {
    if (err) {
      res.send("Please Login");
      console.log({ msg: err.message });
    } else {
      console.log(result);
      try {
        const posts = await Post.find(filter);
        res.send(posts);
      } catch (er) {
        console.log(er.message);
        res.send("Try again");
      }
    }
  });
});

postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = new Post(payload);
    await post.save();
    res.send("Post saved Successfully");
  } catch (err) {
    res.send(err.message);
  }
});

postRouter.put("/update/:id", async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  try {
    let data = await Post.findByIdAndUpdate(_id, payload);
    res.send("Post updated Successfully");
  } catch (err) {
    res.send(err.message);
  }
})
postRouter.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    let data = await Post.findByIdAndDelete({ _id });
    res.send("Post deleted Successfully");
  } catch (err) {
    res.send(err.message);
  }
})

module.exports = { postRouter };