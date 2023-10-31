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

import { createContext, useContext } from "react";

import { Card, User } from "../interface";
import { ApolloError } from "@apollo/client";

type UserContextType = {
  user: User;
  loading: boolean;
  error: ApolloError | undefined;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
export const CardContext = createContext<Card | undefined>(undefined);

export function useUserContext() {
  const user = useContext(UserContext);
  if (user === undefined) {
    throw new Error("useUserContext must be used with a UserContext");
  }
  return user;
}

export function useCardContext() {
  const card = useContext(CardContext);
  if (card === undefined) {
    throw new Error("useCardContext must be used with a CardContext");
  }
  return card;
}
