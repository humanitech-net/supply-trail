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
import { UserPageContextProvider } from "../components/ContextProvider/UserPageContextProvider";
import { CardContextProvider } from "../components/ContextProvider/CardContextProvider";
import { MockedProvider } from "@apollo/client/testing";
import { GET_USER_QUERY } from "../../../hooks/util/query";

describe("ProfileHolder", () => {
  const mockData = {
    getUser: {
      id: "id",
      username: "username",
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
    },
  };

  const mockClient = {
    request: {
      query: GET_USER_QUERY,
    },
    result: {
      data: mockData,
    },
  };
  test("renders profileHolder", () => {
    render(
      <MockedProvider mocks={[mockClient]}>
        <UserPageContextProvider>
          <CardContextProvider>
            <ProfileHolder />
          </CardContextProvider>
        </UserPageContextProvider>
        ,
      </MockedProvider>,
    );
  });
});
