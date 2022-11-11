const router = require("express").Router();
const {
  addPost,
  deletePost,
  otherPosts,
  updatePost,
  getPosts,
  getPost,
} = require("../controllers/post");
const Post = require("../models/Post");

//add post
router.post("/create", addPost);

//update
router.post("/update", updatePost);

//get all posts
router.get("/allposts", getPosts);

router.get("/:id", getPost);

//otherposts
router.post("/otherposts", otherPosts);

//delete a blogpost
router.post("/deletepost", deletePost);

module.exports = router;
