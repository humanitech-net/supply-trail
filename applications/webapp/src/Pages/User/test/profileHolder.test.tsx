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

import ProfileHolder from "../components/profileHolder";
import { UserContext, CardContext } from "../context";

describe("ProfileHolder", () => {
  const mockUser = {
    username: "username",
    firstName: "name",
    lastName: "fname",
    email: "test@test.com",
    phoneNumber: "123456",
    address: "address",
    birthdate: "test",
    description: "description",
  };

  const mockCard = {
    editable: false,
    elevation: 0,
    setEditable: jest.fn(),
    setElevation: jest.fn(),
    editUser: jest.fn(),
  };
  test("renders profileHolder", () => {
    render(
      <UserContext.Provider value={mockUser}>
        <CardContext.Provider value={mockCard}>
          <ProfileHolder />
        </CardContext.Provider>
      </UserContext.Provider>,
    );
  });
});
