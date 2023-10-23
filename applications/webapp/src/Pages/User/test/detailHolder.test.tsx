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
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import DetailHolder from "../components/detailHolder";
import { EditUserMutation } from "../graphql/mutation";
import { CardContext, UserContext } from "../context";
import { BrowserRouter } from "react-router-dom";

describe("DetailHolder", () => {
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

  const mockNewFirstName = "new first name";
  const mockNewLastName = "new lastName name";

  const editUserMock = {
    request: {
      query: EditUserMutation,
      variables: {
        userInput: {
          username: mockUser.username,
          firstName: mockNewFirstName,
          lastName: mockNewLastName,
        },
      },
    },
    result: {
      data: {
        editUser: true,
      },
    },
  };

  test("renders detailHolder", () => {
    render(
      <BrowserRouter>
        <MockedProvider>
          <UserContext.Provider value={mockUser}>
            <CardContext.Provider value={mockCard}>
              <DetailHolder />
            </CardContext.Provider>
          </UserContext.Provider>
        </MockedProvider>
      </BrowserRouter>,
    );
  });

  test("updates user details on button click", async () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={[editUserMock]}>
          <UserContext.Provider value={mockUser}>
            <CardContext.Provider value={mockCard}>
              <DetailHolder />
            </CardContext.Provider>
          </UserContext.Provider>
        </MockedProvider>
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: mockNewFirstName },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: mockNewLastName },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(editUserMock.request.variables.userInput).toEqual({
        username: mockUser.username,
        firstName: mockNewFirstName,
        lastName: mockNewLastName,
      });
    });

    expect(mockCard.setEditable).toHaveBeenCalledWith(true);
    expect(mockCard.setElevation).toHaveBeenCalledWith(0);
  });
});
