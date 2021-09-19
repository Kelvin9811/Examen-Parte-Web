import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import  LoginScreen  from "./screens/LoginScreen";
import UserServices from "./screens/UserServices";
import AdminAverage from "./screens/AdminAverage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/LoginScreen">
            <LoginScreen />
          </Route>
          <Route path="/users">
            <UserServices />
          </Route>
          <Route path="/">
            <AdminAverage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}