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

// import React from "react";
// import { render } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import Home from "../home";

// describe("HomePage", () => {
//   test("renders NavBar component", () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>,
//     );
//   });
// });

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../home";

describe("Home", () => {
  // test("opens and closes drawer", () => {
  //   const { getByLabelText, getByRole } = render(
  //     <MemoryRouter>
  //       <Home />
  //     </MemoryRouter>
  //   );

  //   // Initially, the drawer should be closed
  //   const drawer = getByRole("navigation");
  //   expect(drawer).toHaveStyle("display: none");

  //   // Find the open drawer IconButton and click it
  //   const openDrawerIconButton = getByLabelText("open drawer");
  //   fireEvent.click(openDrawerIconButton);

  //   // After clicking the open drawer IconButton, the drawer should be open
  //   expect(drawer).not.toHaveStyle("display: none");

  //   // Find the close drawer IconButton and click it
  //   const closeDrawerIconButton = getByLabelText("close drawer");
  //   fireEvent.click(closeDrawerIconButton);

  //   // After clicking the close drawer IconButton, the drawer should be closed again
  //   expect(drawer).toHaveStyle("display: none");
  // });

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
    const OpenDrawerButton = getByLabelText("open drawer");
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

    const OpenDrawerButton = getByLabelText("open drawer");
    fireEvent.click(OpenDrawerButton);

    const CloseDrawerButton = getByLabelText("close drawer");
    expect(CloseDrawerButton).toBeInTheDocument;

    fireEvent.click(CloseDrawerButton);

    expect(OpenDrawerButton).toBeInTheDocument;
  });
});
