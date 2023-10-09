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
import { MemoryRouter } from "react-router-dom";
import DetailHolder from "../components/detailHolder";

describe("DetailHolder", () => {
  test("renders detailHolder", () => {
    const mockProps = {
      firstName: "name",
      lastName: "fname",
      email: "test@test.com",
      phoneNumber: "123456",
      address: "address",
      birthdate: "test",
    };
    render(
      <MemoryRouter>
        <DetailHolder
          firstName={mockProps.firstName}
          lastName={mockProps.lastName}
          email={mockProps.email}
          phoneNumber={mockProps.phoneNumber}
          address={mockProps.address}
          birthdate={mockProps.birthdate}
        />
      </MemoryRouter>,
    );
  });
});
