import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter,
});

export const bootstrap = [lifecycles.bootstrap];

export const mount = [lifecycles.mount];

export const unmount = [lifecycles.unmount];

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById("migration");
  if (!el) {
    el = document.createElement("div");
    el.id = "stats";
    document.body.appendChild(el);
  }

  return el;
}
