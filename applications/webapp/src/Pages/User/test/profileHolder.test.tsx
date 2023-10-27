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

test("renders profileHolder", () => {
  render(
    <UserPageContextProvider>
      <CardContextProvider>
        <ProfileHolder />
      </CardContextProvider>
    </UserPageContextProvider>,
  );
});
