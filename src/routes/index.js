import React from "react";
import Route from "./Route";
import { Switch } from "react-router";
import Home from "../pages/Home";

export default function Routes () {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

    </Switch>
  );
}
