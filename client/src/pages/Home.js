import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getposts, editPost } from "../actions";

export default function Home() {
  const navigate = useNavigate();
  const postItems = useSelector((state) => state?.postReducer?.posts);
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

  const blogCategory =
    postItems?.length > 0 ? (
      postItems?.map((post) => (
        <div className="post" key={post._id}>
          <div className="img">
            <img src={post.postimage} alt="" />
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
      <h1>No post in the selected category</h1>
    );

  const homeContent = loading ? (
    <div className="spinner-widget">
      <div
        className="spinner-border spinner-border-lg ms-2"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    blogCategory
  );

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
