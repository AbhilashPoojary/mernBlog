import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/index";
import moment from "moment";

export default function Pofile() {
  const currentUser = useSelector((state) => state?.loginReducer?.currentUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <section
      className="profile-section pt-3 pb-3"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div className="container">
        <h1>
          Welcome <span>{currentUser.username}</span>
          <span>{currentUser?.isAdmin && "[Admin]"}</span>
        </h1>
        <div className="user-details mt-2 pt-2 pb-2 ps-3 pe-3 rounded border border-dark">
          <div className="d-flex  justify-content-between">
            <div className="profile-pic mt-2">
              <img
                src={currentUser.profilePicture}
                className="rounded"
                alt=""
              />
            </div>
            <div className="logout">
              <button className="btn btn-danger" onClick={logoutHandler}>
                logout
              </button>
            </div>
          </div>
          <div className="user-info mt-2">
            <h5>Name: {currentUser.username}</h5>
            <h5>Email: {currentUser.email}</h5>
            <h5>
              Account created at: {moment(currentUser.createdAt).format("lll")}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}
