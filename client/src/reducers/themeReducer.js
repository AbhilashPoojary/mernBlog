import { darkMode } from "../actions";

export const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return {
        darkMode: action.payload,
      };
    default:
      return state;
  }
};
