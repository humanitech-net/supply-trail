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

import { User } from "../../../Pages/interface";

export const CHANGE_PASSWORD_URL =
  "https://dev.supply-trail.humanitech.net/auth/realms/humanitech/protocol/openid-connect/auth?response_type=code&client_id=supply-trail-app&kc_action=UPDATE_PASSWORD";

export const labels: Partial<Record<keyof User, string>> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phoneNumber: "Phone Number",
  address: "Address",
  birthdate: "Birth Date",
};

export const fields: Array<keyof User> = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "address",
  "birthdate",
];
