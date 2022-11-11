import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.post("/api/auth/reqister", user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    window.location.href = "/login";
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error.response.data });
  }
};

export const loginUser = (user) => async (dispatch, getState) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/auth/login", user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error.response.data });
  }
};

export const loginErr = () => (dispatch) => {
  dispatch({ type: "REMOVE_ERROR_LOGIN" });
};

export const signErr = () => (dispatch) => {
  dispatch({ type: "REMOVE_ERROR_SIGN" });
};

export const darkMode = (dark) => (dispatch) => {
  dispatch({ type: "CHANGE_MODE", payload: dark });
  console.log(dark);
  localStorage.setItem("theme", JSON.stringify(dark));
};

export const updateUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_UPDATE_REQUEST" });
  try {
    const response = await axios.post("/api/user/updateuser", user);
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "USER_UPDATE_FAILED", payload: error.response.data });
  }
};

//logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

//create post
export const createPost = (post) => async (dispatch) => {
  dispatch({ type: "CREATE_POST_REQUEST" });
  try {
    const response = await axios.post("/api/post/create", post);
    dispatch({ type: "CREATE_POST_SUCCESS", payload: response.data });
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "CREATE_POST_FAILED", payload: error });
  }
};

export const updatePost = (post) => async (dispatch) => {
  dispatch({ type: "UPDATE_POST_REQUEST" });
  try {
    const response = await axios.post("/api/post/update", post);
    dispatch({ type: "UPDATE_POST_SUCCESS", payload: response.data });
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "UPDATE_POST_FAILED", payload: error });
  }
};

//get posts
//allposts
export const getposts = (cat) => async (dispatch) => {
  dispatch({ type: "GET_POST_REQUEST" });
  try {
    const response = await axios.get(`/api/post/allposts/${cat}`);
    dispatch({ type: "GET_POST_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_POST_FAILED", payload: error });
  }
};

//get a post
//:id
export const singlePost = (id) => async (dispatch) => {
  dispatch({ type: "SINGLE_POST_REQUEST" });
  try {
    const response = await axios.get(`/api/post/${id}`);
    dispatch({ type: "SINGLE_POST_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "SINGLE_POST_FAILED", payload: error });
  }
};

//other post you may like
export const otherPosts = (postInfo) => async (dispatch) => {
  dispatch({ type: "OTHER_POSTS_REQUEST" });
  try {
    const response = await axios.post("/api/post/otherposts", postInfo);
    dispatch({ type: "OTHER_POSTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "OTHER_POSTS_FAILED" });
  }
};

export const editPost = (val) => (dispatch) => {
  dispatch({ type: "EDIT_POST", payload: val });
};

export const deletePost = (postId) => async (dispatch) => {
  console.log(postId);
  dispatch({ type: "DELETE_POST_REQUEST" });
  try {
    const response = await axios.post("/api/post/deletepost", { postId });
    dispatch({ type: "DELETE_POST_SUCCESS", payload: response.data });
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "DELETE_POST_FAILED", payload: error.response.data });
  }
};
