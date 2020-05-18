import { SET_CURRENT_USER } from "../action/types";
import isValid from "../utils/is-empty";
const initialState = {
  isAuthenticated: false,
  users: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isValid(action.payload),
        users: action.payload,
      };
    default:
      return state;
  }
};
