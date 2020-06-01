import React from "react";
import ReactDOM from "react-dom";
import Root from "./root.component";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./assets/theme/theme-maun.scss";
import "./assets/layout/css/layout-maun.scss";

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
