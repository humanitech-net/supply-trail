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
import { useCardContext } from "src/Pages/User/context";
import { useGenericMutation } from "./useGenericMutation";
import { User } from "../Pages/interface";

type UserInput = {
  userInput: { username: string; firstName: string; lastName: string };
};

export default function useUpdateUser(newUserData: User) {
  const userInput: UserInput = {
    userInput: {
      username: newUserData.username,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
    },
  };

  const mutate = useGenericMutation("EDIT_USER", userInput);

  const { callMutation, data, loading, error } = mutate;

  const card = useCardContext();

  const { editable, setEditable, setElevation } = card;

  const updateUser = () => {
    callMutation();
    if (data) {
      setEditable(!editable);
      setElevation(0);
      return <>data</>;
    }
    if (loading) {
      <>loading</>;
    }
    return <>error</>;
  };

  return { updateUser, data, loading, error };
}
