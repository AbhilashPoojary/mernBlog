import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost, editPost, updatePost } from "../actions";

export default function Create() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [cat, setCat] = useState("art");
  const [file, setFile] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const currentUser = useSelector((state) => state?.loginReducer?.currentUser);
  const changePost = useSelector((state) => state?.editpostReducer?.editpost);
  const post = useSelector((state) => state?.post?.currentPost);
  const dispatch = useDispatch();

  const postDetails = async (pic) => {
    setPicLoading(true);
    if (pic === undefined) {
      toast.error("Please select an image", {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("api_key", "719368821484965");
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dk0sqc1u9");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dk0sqc1u9/image/upload",
          data
        );

        setFile(res.data.url);
        console.log(res.data.url);
        setPicLoading(false);
        toast.success("image uploaded successfully", {
          position: "bottom-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.log(error);
        setPicLoading(false);
      }
    } else {
      toast.error("Please select a image", {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const publishPost = () => {
    console.log(changePost);
    if (changePost) {
      const postItems = {
        title,
        postinfo: value,
        postimage: file,
        category: cat,
        postId: post?._id,
        username: currentUser?.username,
        profilePicture: currentUser?.profilePicture,
        userId: currentUser?._id,
      };
      dispatch(updatePost(postItems));
      dispatch(editPost(false));
    } else {
      const postItems = {
        postinfo: value,
        postimage: file,
        category: cat,
        title,
        username: currentUser?.username,
        profilePicture: currentUser?.profilePicture,
        userId: currentUser?._id,
      };
      dispatch(createPost(postItems));
    }
  };

  useEffect(() => {
    if (changePost) {
      setTitle(post?.title);
      setValue(post?.postinfo);
      setFile(post?.postimage);
      setCat(post?.category);
    }
  }, [changePost]);

  console.log(value);

  return (
    <section className="container" style={{ minHeight: "calc(100vh - 180px)" }}>
      <div className="create-section">
        <div className="content">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editor-wrap">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              name="file"
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            {picLoading && (
              <div
                className="spinner-border spinner-border-sm ms-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            <div className="buttons">
              <button>Save as a draft</button>
              <button onClick={publishPost}>
                {changePost ? "Update" : "Publish"}
              </button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "art"}
                name="art"
                value="art"
                onChange={() => setCat("art")}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "science"}
                name="science"
                value="science"
                onChange={() => setCat("science")}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "technology"}
                name="technology"
                value="technology"
                onChange={() => setCat("technology")}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "cinema"}
                name="cinema"
                value="cinema"
                onChange={() => setCat("cinema")}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "design"}
                name="design"
                value="design"
                onChange={() => setCat("design")}
              />
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "food"}
                name="food"
                value="food"
                onChange={() => setCat("food")}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
