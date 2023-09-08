import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import keycloak from "./auth/keycloak";

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

const refreshToken = () => {
  keycloak
    .updateToken(300)
    .then((refreshed) => {
      if (refreshed) {
        localStorage.setItem("token", JSON.stringify(keycloak.token));
      }
    })
    .catch((error) => {
      console.log("Failed to refresh token:", error);
    });
};

initKeycloak()
  .then(() => {
    renderApp();
    setInterval(refreshToken, 300000);
  })
  .catch((error) => {
    console.log(error);
  });
