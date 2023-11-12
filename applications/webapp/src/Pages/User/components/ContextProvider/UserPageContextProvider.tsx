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

import React, { useMemo, useState } from "react";
import { useCurrentUserData } from "../../../../hooks/useCurrentUserData";
import { UserContext } from "../../context";
import useUserEntry from "../../../../hooks/useUserEntry";

export function UserPageContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    user: initialUser,
    loading: queryLoading,
    error: queryError,
  } = useCurrentUserData();

  const {
    update,
    user: updatedUser,
    loading: mutationLoading,
    error: mutationError,
  } = useUserEntry();

  const [userUpdated, setUserUpdated] = useState(false);

  const user = userUpdated ? updatedUser : initialUser;
  const loading = userUpdated ? mutationLoading : queryLoading;
  const error = userUpdated ? mutationError : queryError;

  const userpagecontext = useMemo(
    () => ({
      user,
      loading,
      error,
      setUserUpdated,
      update,
    }),
    [user, loading, error],
  );

  return (
    <UserContext.Provider value={userpagecontext}>
      {children}
    </UserContext.Provider>
  );
}
