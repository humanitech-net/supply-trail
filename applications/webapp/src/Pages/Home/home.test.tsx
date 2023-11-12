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
import { MemoryRouter } from "react-router-dom";
import Home from "./home";

describe("Home", () => {
  const openDrawerLabel = "open drawer";
  test("renders navbar", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const AppBar = getByLabelText("navigation-bar");
    expect(AppBar).toBeInTheDocument;
  });

  test("open drawer", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const OpenDrawerButton = getByLabelText(openDrawerLabel);
    fireEvent.click(OpenDrawerButton);

    const Drawer = getByLabelText("drawer");
    expect(Drawer).toBeInTheDocument;
  });

  test("close drawer", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const OpenDrawerButton = getByLabelText(openDrawerLabel);
    fireEvent.click(OpenDrawerButton);

    const CloseDrawerButton = getByLabelText("close drawer");
    expect(CloseDrawerButton).toBeInTheDocument;

    fireEvent.click(CloseDrawerButton);

    expect(OpenDrawerButton).toBeInTheDocument;
  });
});
