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
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UserPage from "../userPage";
import { MockedProvider } from "@apollo/client/testing";
import { getUserQuery } from "../graphql/userQuery";

describe("UserPage", () => {
  const mockData = {
    getUser: {
      username: "username",
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
    },
  };

  const mockClient = {
    request: {
      query: getUserQuery,
    },
    result: {
      data: mockData,
    },
  };

  const mockCard = {
    setEditable: jest.fn(),
    setElevation: jest.fn(),
  };

  test("render data when successfully fetched", () => {
    render(
      <MockedProvider mocks={[mockClient]}>
        <UserPage />
      </MockedProvider>,
    );
  });

  test("editUser", async () => {
    render(
      <MockedProvider mocks={[mockClient]}>
        <UserPage />
      </MockedProvider>,
    );

    await waitFor(() => {
      screen.getAllByLabelText("edit user");
    });

    expect(screen.getByText("Edit Profile")).toBeInTheDocument;
    fireEvent.click(screen.getByText("Edit Profile"));

    expect(mockCard.setEditable).toHaveBeenCalled;
    expect(mockCard.setElevation).toHaveBeenCalled;
  });
});
