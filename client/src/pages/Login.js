import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginErr, loginUser, signErr } from "../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state?.loginReducer?.error?.message);

  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch(signErr());
  }, [error]);
  return (
    <section className="login-section">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <input
            type="text"
            name="email"
            placeholder="abc@mymail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="passwod"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary btn-block btn-large"
            >
              Sign In
            </button>
            <span className="login-link" style={{ fontSize: "0.8rem" }}>
              Dont have an account? <Link to="/signup">register</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
