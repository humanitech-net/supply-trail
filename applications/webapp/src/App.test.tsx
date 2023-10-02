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
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders NavBar", () => {
    render(<App />);
  });

  test("openDrawer sets open state to true", () => {
    const { getByLabelText } = render(<App />);
    const openDrawerButton = getByLabelText("open drawer");
    fireEvent.click(openDrawerButton);
    expect(openDrawerButton).toBeTruthy();
  });
});
