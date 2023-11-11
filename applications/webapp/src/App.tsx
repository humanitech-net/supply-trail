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
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/home";

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Home />
    </BrowserRouter>
  );
}
