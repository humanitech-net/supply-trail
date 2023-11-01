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

import { EditUserMutation } from "./mutation";
import { GET_USER_QUERY } from "./query";
import { userSchema } from "./schema";
import {
  MutationConfigs,
  QueryConfigs,
  UserData,
  EditUserVariable,
} from "./types";

export const queryConfigs: QueryConfigs = {
  GET_USER: {
    query: GET_USER_QUERY,
    schema: userSchema,
    data: {} as UserData,
  },
};

export const mutationConfigs: MutationConfigs = {
  EDIT_USER: {
    mutation: EditUserMutation,
    data: "",
    variables: {} as EditUserVariable,
  },
};
