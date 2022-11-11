import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/index";
import moment from "moment";
import Tabs from "../components/Tabs";
import ModalProfile from "../components/ModalProfile";

export default function Pofile() {
  console.log(useSelector((state) => state?.loginReducer?.currentUser));
  const loading = useSelector((state) => state?.loginReducer?.loading);
  const currentUser = useSelector((state) => state?.loginReducer?.currentUser);
  const postItems = useSelector((state) => state?.postReducer?.posts);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const userPosts = postItems?.filter(
    (item) => currentUser?._id === item.userId
  );

  const capitalCase = (str) => {
    if (!str) {
      return false;
    }
    return str[0]?.toUpperCase() + str.slice(1);
  };

  const spinner = (
    <div className="spinner-widget">
      <div
        className="spinner-border spinner-border-lg ms-2"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return (
    <section
      className="profile-section"
      style={{ minHeight: "calc(100vh - 160px)" }}
    >
      {/* <div className="container">
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
      </div> */}
      {loading ? (
        spinner
      ) : (
        <div className="container">
          <div className="profile-pics">
            <div className="cover-pic">
              <img
                alt="image"
                src={
                  currentUser?.coverPicture ||
                  "https://murraysinteriors.com.au/wp-content/uploads/2018/09/dummy-banner-768x344.jpg"
                }
              />
            </div>
            <div className="profile-details">
              <img
                alt="image"
                src={
                  currentUser?.profilePicture ||
                  "https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-1/308824377_2155390567975677_1814205475736935332_n.jpg?stp=dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DMKBrIVnLzYAX9Cossv&_nc_ht=scontent-bom1-1.xx&oh=00_AfAO0_e_SzfmEckiMoaeAoUJfGqxepPwA_9x-Ce7p6QUHw&oe=6364854D"
                }
              />
              <div className="profile-info">
                <h3>{capitalCase(currentUser?.username)}</h3>
                <h5>{userPosts?.length} posts</h5>
                <div className="post-icons d-flex">
                  <div className="icon"></div>
                  <div className="icon"></div>
                  <div className="icon"></div>
                  <div className="icon"></div>
                </div>
              </div>
              <div className="btn-container">
                <button
                  className="btn btn-primary btn-profile"
                  onClick={() => setModalShow(true)}
                >
                  Update profile
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="profile-tabs">
            <Tabs />
          </div>
        </div>
      )}

      <ModalProfile show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
}
