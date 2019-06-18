import React, { useEffect } from "react";
import NavigationBar from "./components/navigationBar/NavigationBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./views/homePage/HomePage";
import RegisterPage from "./views/registerPage/RegisterPage";
import LoginPage from "./views/loginPage/LoginPage";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ProfilePage from "./views/profilePage/ProfilePage";
import MakePost from "./views/makePost/MakePost";
import PublicTimeline from "./views/timeline/publicTimeline/PublicTimeline";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavigationBar />
          <div>
            <Switch>
              <Route exact path="/" component={PublicTimeline} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/profile" component={ProfilePage} />
              <PrivateRoute exact path="/post" component={MakePost} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
