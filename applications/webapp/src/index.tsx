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
  .init({}) // Remove the 'onLoad' configuration or set it to 'check-sso'
  .then((authenticated) => {
    if (authenticated) {
      console.log("User is authenticated");
    } else {
      console.log("User is not authenticated");
    }
    renderApp(); // Move renderApp inside the 'then' block
  })
  .catch((error) => {
    console.error("Keycloak initialization error:", error);
  });

renderApp();
