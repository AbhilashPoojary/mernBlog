import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { postReducer } from "./postReducer";
import { singlepostReducer } from "./singlepostReducer";
import { diffpostsReducer } from "./diffpostsReducer";
import { editpostReducer } from "./editpostReducer";

export default combineReducers({
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  postReducer: postReducer,
  post: singlepostReducer,
  diffpostsReducer: diffpostsReducer,
  editpostReducer: editpostReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
console.log(currentUser);

export const initialState = {
  loginReducer: { currentUser },
};
