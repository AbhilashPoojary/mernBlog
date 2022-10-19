import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPost, singlePost } from "../actions";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";
import Modaldelete from "../components/Modaldelete";
import { ToastContainer, toast } from "react-toastify";

export default function BlogDetail() {
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const post = useSelector((state) => state?.post?.currentPost);
  const loading = useSelector((state) => state?.post?.loading);
  //const loading = true;
  const currentUser = useSelector((state) => state?.loginReducer?.currentUser);

  useEffect(() => {
    dispatch(singlePost(blogId));
  }, [blogId, dispatch]);

  const handleEdit = () => {
    dispatch(editPost(true));
    navigate("/create");
  };

  const detailContent = loading ? (
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
    <div className="content">
      <img src={post?.postimage} alt="" />
      <div className="user">
        {post?.profilePicture && <img src={post?.profilePicture} alt="" />}
        <div className="info">
          <span>{post?.username}</span>
          <p>Posted {moment(post?.createdAt).startOf("hour").fromNow()}</p>
        </div>
        {post?.username === currentUser?.username && (
          <div className="edit">
            <button className="btn btn-primary" onClick={() => handleEdit()}>
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setModalShow(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {post?.createdAt !== post?.updatedAt ? (
        <div className="edit-info">
          <span>
            <span
              style={{ fontWeight: "boldest", color: "#ff0000" }}
              className="pe-1"
            >
              **
            </span>
            This post is Edited on {moment(post?.updatedAt).startOf().fromNow()}
          </span>
        </div>
      ) : (
        ""
      )}

      <h1>{post?.title}</h1>

      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post?.postinfo),
        }}
      ></p>
    </div>
  );

  return (
    <div className="container">
      <div className="single mt-3" style={{ minHeight: "calc(100vh - 176px)" }}>
        {detailContent}
        <Menu />
      </div>
      <Modaldelete show={modalShow} onHide={() => setModalShow(false)} />
      <ToastContainer />
    </div>
  );
}
