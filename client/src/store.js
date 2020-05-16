import rootReducer from "./Reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const middleware = [thunk];
const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
