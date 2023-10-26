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

import { useMemo } from "react";
import useCustomQuery from "./useCustomQuery";

export const useCurrentUserData = () => {
  const { data, loading, error } = useCustomQuery("GET_USER");

  const { username, firstName, lastName, email } = data?.getUser || {};

  const phoneNumber = "123456789";
  const address = "Addis Ababa";
  const birthdate = "April 19, 2001";
  const description = `Hi, I am ${username}`;

  const user = useMemo(
    () => ({
      username: username || "",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phoneNumber,
      address,
      birthdate,
      description,
    }),
    [
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      birthdate,
      description,
    ],
  );

  return { user, loading, error };
};
