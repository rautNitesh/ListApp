import { SET_CURRENT_USER, GET_ERROR } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      })
    );
};
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
};

export const removeCurrentUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
