export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case "USER_LOGIN_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    case "REMOVE_ERROR_LOGIN":
      return {
        loading: false,
        error: false,
      };
    case "USER_UPDATE_REQUEST":
      return {
        loading: true,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case "USER_UPDATE_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
