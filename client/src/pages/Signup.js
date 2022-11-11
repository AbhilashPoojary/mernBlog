import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginErr, registerUser, signErr } from "../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const error = useSelector((state) => state?.registerReducer?.error?.message);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    "https://res.cloudinary.com/dk0sqc1u9/image/upload/v1667468652/e9cvd7thjutanralp1jo.png"
  );
  const [picLoading, setPicLoading] = useState(false);

  const dispatch = useDispatch();

  const postDetails = async (pic) => {
    setPicLoading(true);
    if (pic === undefined) {
      toast.error("Please select an image", {
        position: "bottom-right",
        autoClose: 8000,
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

        setProfilePicture(res.data.url);
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Password dont match", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const user = {
        username,
        email,
        password,
        profilePicture,
      };
      try {
        dispatch(registerUser(user));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch(loginErr());
  }, [error]);

  return (
    <section className="login-section">
      <div className="login">
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <div className="mb-3">
            <label
              htmlFor="formFileSm"
              className="form-label"
              style={{ color: "#fff" }}
            >
              Upload profile pic
            </label>
            <input
              className="form-control form-control-sm"
              name="formFileSm"
              type="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-large"
            >
              Sign In
            </button>
            <span className="login-link" style={{ fontSize: "0.8rem" }}>
              Already have an account? <Link to="/login">login</Link>
            </span>
          </div>
          {picLoading && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
