import { GET_POST } from "./types";
import axios from "axios";
var header = { "Content-Type": "multipart/form-data" };
export const getPost = () => (dispatch) => {
  axios.get("/posts", { headers: header }).then((res) => {
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  });
};
