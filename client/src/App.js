import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./components/post/Post";
import { Provider } from "react-redux";
import store from "./store";

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
        </div>
      </Provider>
    </Router>
  );
}

export default App;
