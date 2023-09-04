import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import keycloak from "./keycloak";

const renderApp = () => {
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root"),
  );
};

keycloak
  .init({ onLoad: "login-required" })
  .then((authenticated) => {
    if (authenticated) {
      console.log("User is authenticated");
      renderApp();
    } else {
      console.log("User is not authenticated");
    }
  })
  .catch((error) => {
    console.error("Keycloak initialization error:", error);
  });

renderApp();
