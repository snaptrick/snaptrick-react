import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css"; // Import your global styles

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // Select the root element from the HTML
);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
