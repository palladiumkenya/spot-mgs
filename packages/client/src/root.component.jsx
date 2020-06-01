import React from "react";
import Migration from "./components/Migration";
import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter,
} from "react-router-dom";

export default function Root(props) {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/migration" component={Migration} />
        <Route path="*" component={Migration} />
      </Switch>
    </HashRouter>
  );
}
