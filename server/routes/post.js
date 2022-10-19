const router = require("express").Router();
const Post = require("../models/Post");

//add post
router.post("/create", async (req, res) => {
  const { title, postinfo, postimage, category, username, profilePicture } =
    req.body;
  try {
    //create a new post
    const newPost = new Post({
      title,
      postinfo,
      username,
      postimage,
      category,
      profilePicture,
    });
    console.log(newPost);
    //save user and send response
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.post("/update", async (req, res) => {
  const { title, postinfo, postimage, category, postId } = req.body;
  try {
    const findPost = await Post.findOne({ _id: postId });
    if (findPost) {
      const updatedPost = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          title,
          postinfo,
          postimage,
          category,
        },
        { new: true }
      );
      console.log(updatedPost);
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts
router.get("/allposts", async (req, res) => {
  try {
    const cat = req.query.cat;
    console.log(cat);
    if (cat) {
      console.log(cat);
      const catposts = await Post.find({
        category: {
          $eq: cat,
        },
      });
      res.send(catposts);
    } else {
      const posts = await Post.find({});
      res.send(posts);
    }
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    //const { password, ...other } = Post._doc;
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//otherposts
router.post("/otherposts", async (req, res) => {
  try {
    const { postId, category } = req.body;
    const otherPosts = await Post.find({
      category: {
        $eq: category,
      },
      _id: {
        $ne: postId,
      },
    });
    res.status(200).json(otherPosts);
    !otherPosts && res.status(304).json("no posts found");
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a blogpost
router.post("/deletepost", async (req, res) => {
  const { postId } = req.body;
  try {
    await Post.deleteOne({ _id: postId });
    res.status(200).json("post deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
