import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, getposts, darkMode } from "../actions/index";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Tabs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cat = useLocation().search;

  const currentUser = useSelector((state) => state?.loginReducer?.currentUser);
  const darkTheme = useSelector((state) => state?.themeReducer?.darkMode);
  const postItems = useSelector((state) => state?.postReducer?.posts);
  const [toggleState, setToggleState] = useState(1);
  const [dark, setDark] = useState(darkTheme);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const postRoute = (Id) => {
    navigate(`/post/${Id}`);
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const capitalCase = (str) => {
    if (!str) {
      return false;
    }
    return str[0]?.toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    dispatch(getposts(cat));
  }, []);
  useEffect(() => {
    dispatch(darkMode(dark));
  }, [dark]);
  const userPosts = postItems?.filter(
    (item) => currentUser?._id === item.userId
  );
  return (
    <>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Posts
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          About
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          More
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={`home ${
            toggleState === 1 ? "content  active-content" : "content"
          }`}
        >
          <h2>{`${capitalCase(currentUser?.username)}'s posts`}</h2>
          <hr />
          <div className="posts">
            {userPosts?.length > 0 ? (
              userPosts?.map((post) => (
                <div className="post" key={post._id}>
                  <div className="img">
                    <img
                      src={
                        post.postimage ||
                        "https://murraysinteriors.com.au/wp-content/uploads/2018/09/dummy-banner-768x344.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <Link className="link" to={`/post/${post._id}`}>
                      <h1>{post.title}</h1>
                    </Link>
                    <p>{getText(post.postinfo.substring(0, 250))}</p>
                    <button onClick={() => postRoute(post._id)}>
                      Read More
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>No posts </h1>
            )}
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>About</h2>
          <hr />
          <p>Studied at: {currentUser?.education}</p>
          <p>Lives in: {currentUser?.city}</p>
          <p>From : {currentUser?.town}</p>
          <p>{capitalCase(currentUser?.relationStatus)}</p>
          <p>Phone : {currentUser?.phoneNo}</p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div className="d-flex justify-content-between">
            <div>
              <h2>Settings</h2>
              <hr />
            </div>
            <div>
              <span>Logout user: </span>
              <button className="btn btn-danger ms-3" onClick={logoutHandler}>
                logout
              </button>
            </div>
          </div>

          <h5>Display & accessibility</h5>
          <div className="d-mode-wrapeer  d-flex">
            <div className="d-icon">
              <img
                alt="d-icon"
                src={`${
                  !dark
                    ? "https://cdn-icons-png.flaticon.com/512/5915/5915194.png"
                    : "https://cdn-icons-png.flaticon.com/512/4489/4489231.png"
                }`}
              />
            </div>
            <div className="d-content">
              <h5 className="mb-0">Dark mode</h5>
              <p className="mb-1">
                Adjust the appearance of Facebook to reduce glare and give your
                eyes a break.
              </p>
              <div className="d-radio">
                <div className="form-check">
                  <input
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    className="form-check-input"
                    checked={!dark}
                    onChange={() => setDark(false)}
                  />
                  <label htmlFor="inline-radio-1" className="form-check-label">
                    Off
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                    className="form-check-input"
                    checked={dark}
                    onChange={() => setDark(true)}
                  />
                  <label htmlFor="inline-radio-2" className="form-check-label">
                    On
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
