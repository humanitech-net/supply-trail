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
import { render } from "@testing-library/react";
import NavBar from "../navbar";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  test("renders NavBar component", () => {
    const openDrawerMock = jest.fn();

    render(
      <MemoryRouter>
        <NavBar open={false} openDrawer={openDrawerMock} />
      </MemoryRouter>,
    );
  });
});
