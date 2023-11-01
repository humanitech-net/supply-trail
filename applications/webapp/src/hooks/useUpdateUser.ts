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

import { useCardContext } from "src/Pages/User/context";
import { useGenericMutation } from "./useGenericMutation";

type UserInput = {
  userInput: { username: string; firstName: string; lastName: string };
};

export default function useUpdateUser(userInput: UserInput) {
  const mutate = useGenericMutation("EDIT_USER", userInput);
  const { callMutation, data } = mutate;

  const card = useCardContext();

  const { editable, setEditable, setElevation } = card;

  const updateUser = () => {
    callMutation();
    setEditable(!editable);
    setElevation(0);
  };

  return { updateUser, data };
}
