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
import { useCurrentUserData } from "../../../../hooks/useCurrentUserData";
import { UserContext } from "../../context";

export function UserPageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error } = useCurrentUserData();

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}
