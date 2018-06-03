import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";

console.log(
  "%c Gito Player %c Github.com/iflycn/music ",
  "background:#df3436;padding:1px;border-radius:3px 0 0 3px;color:#fff",
  "background:#888;padding:1px;border-radius:0 3px 3px 0;color:#fff"
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
