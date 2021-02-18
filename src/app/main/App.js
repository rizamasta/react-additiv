import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import { Error404, EmployeeExplorer, EmployeeOverview } from "app/pages";
import AppHistory from "app/utils";

function App() {
  return (
    <Router history={AppHistory}>
      <Switch>
        <Route exact path={"" || "/"} component={EmployeeExplorer} />
        <Route exact path="/overview" component={EmployeeOverview} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
