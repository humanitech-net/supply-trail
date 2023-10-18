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

describe("DetailHolder", () => {
  const mockProps = {
    username: "username",
    firstName: "name",
    lastName: "fname",
    email: "test@test.com",
    phoneNumber: "123456",
    address: "address",
    birthdate: "test",
  };

  const mockCard = {
    editable: false,
    elevation: 0,
    setEditable: jest.fn(),
    setElevation: jest.fn(),
  };

  const editUserMock = {
    request: {
      query: EditUserMutation,
      variables: {
        userInput: {
          username: mockProps.username,
          firstName: "new first name",
          lastName: "new last name",
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
      <MockedProvider>
        <DetailHolder user={mockProps} card={mockCard} />
      </MockedProvider>,
    );
  });

  test("updates user details on button click", async () => {
    render(
      <MockedProvider mocks={[editUserMock]}>
        <DetailHolder user={mockProps} card={mockCard} />
      </MockedProvider>,
    );

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "new first name" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "new last name" },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(editUserMock.request.variables.userInput).toEqual({
        username: mockProps.username,
        firstName: "new first name",
        lastName: "new last name",
      });
    });

    expect(mockCard.setEditable).toHaveBeenCalledWith(true);
    expect(mockCard.setElevation).toHaveBeenCalledWith(0);
  });
});
