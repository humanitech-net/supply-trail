import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GraphQlButton, { Connection } from "./Button";
import { MockedProvider } from "@apollo/client/testing";
import { findByTestId } from "@testing-library/dom";

const mocks = [
  {
    request: {
      query: Connection,
    },
    result: {
      data: {
        findAll: {
          id: 1,
          firstName: "John",
        },
      },
    },
  },
];

describe("GraphQlButton", () => {
  it("should update the id and name when the button is clicked", async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GraphQlButton />
      </MockedProvider>,
    );

    const button = getByTestId("button");
    fireEvent.click(button);

    const idElement = await findByTestId(document.documentElement, "id");
    const nameElement = await findByTestId(document.documentElement, "test");

    expect(Number(idElement.textContent)).toBe(1);
    expect(nameElement.textContent).toBe("John");
  });
});
