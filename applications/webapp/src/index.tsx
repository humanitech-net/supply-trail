/**
 * Humanitech Supply Trail
 *
 * Copyright (c) Humanitech, Peter Rogov and Contributors
 *
 * Website: https://humanitech.net
 * Repository: https://github.com/humanitech-net/supply-trail
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { client } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import { initKeycloak, refreshToken } from "./Authentication/Keycloak";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const renderRoot = () => {
  return root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
  );
};

initKeycloak()
  .then(() => {
    renderRoot();

    const intervalTime = 300000;
    setInterval(refreshToken, intervalTime);
  })
  .catch((error) => {
    console.log(
      `[index.initKeycloak()] An error occurred during keycloak initialization:`,
      error,
    );
  });

reportWebVitals();
