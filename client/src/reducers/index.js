import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { postReducer } from "./postReducer";
import { singlepostReducer } from "./singlepostReducer";
import { diffpostsReducer } from "./diffpostsReducer";
import { editpostReducer } from "./editpostReducer";
import { themeReducer } from "./themeReducer";
import { json } from "react-router-dom";

export default combineReducers({
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  postReducer: postReducer,
  post: singlepostReducer,
  diffpostsReducer: diffpostsReducer,
  editpostReducer: editpostReducer,
  themeReducer: themeReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
console.log(currentUser);

const currentTheme = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme"))
  : null;
console.log(currentTheme);

export const initialState = {
  loginReducer: { currentUser },
  themeReducer: { darkMode: currentTheme },
};
