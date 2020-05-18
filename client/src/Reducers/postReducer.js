import { GET_POST } from "../action/types";
const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
