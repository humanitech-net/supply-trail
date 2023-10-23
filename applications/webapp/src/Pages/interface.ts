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

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthdate: string;
  description: string;
}

export interface Card {
  editable: boolean;
  setEditable: (editable: boolean) => void;
  elevation: number;
  setElevation: (elevation: number) => void;
  editUser: () => void;
}
