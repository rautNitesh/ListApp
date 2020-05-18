import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./components/post/Post";
import { Provider, connect } from "react-redux";
import { setCurrentUser, removeCurrentUser } from "./action/authAction";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import jwt_decode from "jwt-decode";
import Logout from "./components/auth/Logout";
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Post} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <Logout />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
