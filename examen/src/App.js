import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import UserServices from "./screens/UserServices";
import AdminAverage from "./screens/AdminAverage";

export default function App() {

  
  return (
    <Router>
      <Switch>
        <Route path="/UserServices">
          <UserServices />
        </Route>
        <Route path="/AdminAverage">
          <AdminAverage />
        </Route>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router >
  );
}