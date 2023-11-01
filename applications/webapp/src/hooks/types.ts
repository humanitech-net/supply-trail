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

import Joi from "joi";
import { DocumentNode } from "@apollo/client";

export type UserData = {
  getUser: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};
export type UserQueryVariables = Record<string, never>;

export type QueryConfigs = {
  GET_USER: {
    query: DocumentNode;
    data: UserData;
    variables?: UserQueryVariables;
    schema: Joi.ObjectSchema;
  };
};

export type EditUserVariable = {
  userInput: {
    username: string;
    firstName: string;
    lastName: string;
  };
};

export type MutationConfigs = {
  EDIT_USER: {
    mutation: DocumentNode;
    data: string;
    variables: EditUserVariable;
  };
};
