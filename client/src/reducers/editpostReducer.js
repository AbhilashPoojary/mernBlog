export const editpostReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_POST":
      return {
        editpost: action.payload,
      };
    default:
      return state;
  }
};
