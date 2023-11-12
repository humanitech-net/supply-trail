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
import { useGenericMutation } from "./useGenericMutation";
import { EditUserVariable } from "./util/types";

export default function useUserEntry() {
  const { callMutation, data, loading, error } =
    useGenericMutation("EDIT_USER");

  const update = async (newUserData: EditUserVariable) => {
    callMutation(newUserData);
  };

  const { username, firstName, lastName } = data?.editUser ?? {};

  const user = useMemo(
    () => ({
      username: username ?? "",
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: "email",
      birthdate: "birthdate",
      address: "address",
      phoneNumber: "123456789",
      description: `I am ${firstName}`,
    }),
    [username, firstName, lastName],
  );

  return { user, loading, error, update };
}
