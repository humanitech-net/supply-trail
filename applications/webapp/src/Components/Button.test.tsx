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
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import GraphQlButton, { Connection } from "./Button";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";

const mockData = {
  findAll: {
    id: 1,
    firstName: "Test",
  },
};

const successMock = {
  request: {
    query: Connection,
  },
  result: {
    data: mockData,
  },
};

const errorMock = {
  request: {
    query: Connection,
  },
  error: new GraphQLError("the fetch was unsuccessful"),
};

describe("GraphQlButton", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render data when fetched successfully", async () => {
    render(
      <MockedProvider mocks={[successMock]} addTypename={false}>
        <GraphQlButton />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText("Click Me"));

    await waitFor(() => {
      expect(screen.getByText("ID: 1")).toBeInTheDocument;
      expect(screen.getByText("First Name: Test")).toBeInTheDocument;
    });
  });

  it("should render error message when fetch fails", async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <GraphQlButton />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText("Click Me"));

    await waitFor(() => {
      expect(screen.getByText("Error: the fetch was unsuccessful"))
        .toBeInTheDocument;
    });
  });
});
