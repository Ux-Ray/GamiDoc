import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./app/AppRouter";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/utilities.css";
import "./styles/landing.css";
import "./styles/choose-path.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
