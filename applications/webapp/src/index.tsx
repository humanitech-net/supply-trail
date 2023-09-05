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

const initKeycloak = () => {
  return new Promise<void>((resolve, reject) => {
    keycloak
      .init({
        onLoad: "check-sso",
      })
      .then((authenticated) => {
        if (authenticated) {
          localStorage.setItem("token", JSON.stringify(keycloak.token));
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

initKeycloak()
  .then(() => {
    renderApp();
  })
  .catch((error) => {
    console.log(error);
    // Handle initialization error
  });
