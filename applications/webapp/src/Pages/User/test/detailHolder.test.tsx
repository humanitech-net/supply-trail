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
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import DetailHolder from "../components/detailHolder";
import { EditUserMutation } from "../graphql/mutation";
import { CardContext, UserContext } from "../context";
import { BrowserRouter } from "react-router-dom";
import { DocumentNode } from "graphql";

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

  const renderComponent = (
    mocks:
      | {
          request: {
            query: DocumentNode;
            variables: {
              userInput: {
                username: string;
                firstName: string;
                lastName: string;
              };
            };
          };
          error: Error;
        }[]
      | {
          request: {
            query: DocumentNode;
            variables: {
              userInput: {
                username: string;
                firstName: string;
                lastName: string;
              };
            };
          };
          result: { data: { editUser: boolean } };
        }[]
      | readonly MockedResponse<Record<string, any>, Record<string, any>>[]
      | undefined,
  ) => {
    return render(
      <BrowserRouter>
        <MockedProvider mocks={mocks}>
          <UserContext.Provider value={mockUser}>
            <CardContext.Provider value={mockCard}>
              <DetailHolder />
            </CardContext.Provider>
          </UserContext.Provider>
        </MockedProvider>
      </BrowserRouter>,
    );
  };

  test("renders detailHolder", () => {
    renderComponent([]);

    // Your test assertions for rendering go here
  });

  test("handles error during user update", async () => {
    // Mock console.error
    console.error = jest.fn();

    const editUserErrorMock = {
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
      error: new Error("Update failed"), // Simulate an error
    };

    renderComponent([editUserErrorMock]);

    // Your test assertions for error handling go here

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: mockNewFirstName },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: mockNewLastName },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(editUserErrorMock.request.variables.userInput).toEqual({
        username: mockUser.username,
        firstName: mockNewFirstName,
        lastName: mockNewLastName,
      });
    });

    // Check that console.error was called with the expected error messag
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        /\[DetailHolder\.updateUser\] Failed to update user information\. Error: ApolloError: Update failed/,
      ),
    );
  });

  test("updates user details on button click", async () => {
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

    renderComponent([editUserMock]);

    // Your test assertions for successful user update go here

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
