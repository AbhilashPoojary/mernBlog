import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getposts, editPost } from "../actions";

export default function Home() {
  const navigate = useNavigate();
  const postItems = useSelector((state) => state?.postReducer?.posts);
  const darkMode = useSelector((state) => state?.themeReducer?.darkMode);
  //const loading = true;
  const loading = useSelector((state) => state?.postReducer?.loading);
  const dispatch = useDispatch();
  const cat = useLocation().search;
  console.log(cat);
  const postRoute = (Id) => {
    navigate(`/post/${Id}`);
  };

  useEffect(() => {
    dispatch(getposts(cat));
  }, [dispatch, cat]);

  useEffect(() => {
    dispatch(editPost(false));
  }, [dispatch]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  /* const spinner = (
    <div className="spinner-widget">
      <div
        className="spinner-border spinner-border-lg ms-2"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ); */

  const blogCategory =
    postItems?.length > 0 ? (
      postItems?.map((post) => (
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
            <button onClick={() => postRoute(post._id)}>Read More</button>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center">
        <h1
          className={darkMode ? "heading--dark" : ""}
          style={{ fontWeight: "bolder", fontWeight: "bolder" }}
        >
          No post in the selected category
        </h1>
      </div>
    );
  let skeleton = [];
  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <div className="post" key={i}>
        <div className="skeleton skeleton-img"></div>
        <div className="content">
          <h1 className="skeleton skeleton-heading"></h1>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    );
  }
  console.log(skeleton);
  const homeContent = loading ? skeleton : blogCategory;
  console.log(homeContent);
  return (
    <div className="container">
      <div
        className="home"
        style={{ minHeight: "calc(100vh - 220px)", position: "relative" }}
      >
        <div className="posts">{homeContent}</div>
      </div>
    </div>
  );
}
