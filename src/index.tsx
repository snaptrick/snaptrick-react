import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"; // Keep Router here
import App from "./App";
import "./index.css"; // Your global styles

ReactDOM.render(
  <Router>
    {" "}
    {/* Router wraps App here */}
    <App />
  </Router>,
  document.getElementById("root")
);
