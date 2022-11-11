const Post = require("../models/Post");
const { createError } = require("../error");

const addPost = async (req, res, next) => {
  const {
    title,
    postinfo,
    postimage,
    category,
    username,
    profilePicture,
    userId,
  } = req.body;
  try {
    //create a new post
    const newPost = new Post({
      title,
      postinfo,
      username,
      postimage,
      category,
      profilePicture,
      userId,
    });
    console.log(newPost);
    //save user and send response
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    next(createError(err));
  }
};

const updatePost = async (req, res, next) => {
  const {
    title,
    postinfo,
    postimage,
    category,
    postId,
    userId,
    username,
    profilePicture,
  } = req.body;
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
          userId,
          username,
          profilePicture,
        },
        { new: true }
      );
      console.log(updatedPost);
      return res.status(200).json(updatedPost);
    } else {
      return next(
        createError(404, "Something went wrong please try again later")
      );
    }
  } catch (err) {
    next(createError(err));
  }
};

const otherPosts = async (req, res, next) => {
  const { postId, category } = req.body;
  try {
    const otherPosts = await Post.find({
      category: {
        $eq: category,
      },
      _id: {
        $ne: postId,
      },
    });
    res.status(200).json(otherPosts);
    if (!otherPosts) return next(createError(304, "no posts found"));
  } catch (err) {
    next(createError(err));
  }
};

const getPosts = async (req, res, next) => {
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
    next(createError(err));
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    //const { password, ...other } = Post._doc;
    res.status(200).json(post);
  } catch (err) {
    next(createError(err));
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.body;
  try {
    await Post.deleteOne({ _id: postId });
    res.status(200).json("post deleted successfully");
  } catch (err) {
    next(createError(err));
  }
};

module.exports = {
  addPost,
  deletePost,
  otherPosts,
  updatePost,
  getPosts,
  getPost,
};
