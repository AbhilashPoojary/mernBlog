export const postReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_POST_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "CREATE_POST_SUCCESS":
      return {
        loading: false,
        ...state,
      };
    case "CREATE_POST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    case "UPDATE_POST_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "UPDATE_POST_SUCCESS":
      return {
        loading: false,
        ...state,
      };
    case "UPDATE_POST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    case "GET_POST_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_POST_SUCCESS":
      return {
        loading: false,
        posts: action.payload,
      };
    case "GET_POST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    case "DELETE_POST_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "DELETE_POST_SUCCESS":
      return {
        loading: false,
        success: true,
        ...state,
      };
    case "DELETE_POST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
