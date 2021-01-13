import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Component/Homepage/Homepage";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Dashboard from "./Component/Dashboard/Dashboard";
import { AuthProvider } from "./Auth";

export default function RoutePack() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
