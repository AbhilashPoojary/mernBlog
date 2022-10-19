export const singlepostReducer = (state = {}, action) => {
  switch (action.type) {
    case "SINGLE_POST_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "SINGLE_POST_SUCCESS":
      return {
        loading: false,
        currentPost: action.payload,
      };
    case "SINGLE_POST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
