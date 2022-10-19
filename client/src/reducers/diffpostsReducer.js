export const diffpostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "OTHER_POSTS_REQUEST":
      return {
        loading: true,
      };
    case "OTHER_POSTS_SUCCESS":
      return {
        loading: false,
        success: true,
        diffposts: action.payload,
      };
    case "OTHER_POSTS_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
