import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otherPosts } from "../actions";

export default function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state?.post?.currentPost);
  const diffposts = useSelector((state) => state?.diffpostsReducer?.diffposts);
  const loading = useSelector((state) => state?.diffpostsReducer?.loading);
  //const loading = true;
  const postRoute = (Id) => {
    navigate(`/post/${Id}`);
  };

  useEffect(() => {
    const info = {
      postId: currentPost?._id,
      category: currentPost?.category,
    };
    dispatch(otherPosts(info));
  }, [currentPost?._id, currentPost?.category, dispatch]);

  const similarPosts =
    diffposts?.length > 0 ? (
      <>
        <h1>Other posts you may like</h1>
        {diffposts?.map((post) => (
          <div className="post" key={post?._id}>
            <img src={post?.postimage} alt="" />
            <h2>{post?.title}</h2>
            <button onClick={() => postRoute(post?._id)}>Read More</button>
          </div>
        ))}
      </>
    ) : (
      <h3>No similar blog posts</h3>
    );

  let skeleton = [];
  for (let i = 0; i < 2; i++) {
    skeleton.push(
      <div className="post" key={i}>
        <div className="skeleton skeleton-img"></div>
        <div className="content">
          <h1 className="skeleton skeleton-heading"></h1>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    );
  }
  // const spinner = (
  //   <div className="d-flex align-items-center">
  //     <div
  //       className="spinner-border ms-auto"
  //       role="status"
  //       aria-hidden="true"
  //     ></div>
  //   </div>
  // );
  const menuContent = loading ? skeleton : similarPosts;
  return <div className="menu">{menuContent}</div>;
}
