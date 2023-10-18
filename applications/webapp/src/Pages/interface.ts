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

export interface DetailHolderProps {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthdate: string;
  };
  card: {
    editable: boolean;
    elevation: number;
    setEditable: (enabled: boolean) => void;
    setElevation: (elevation: number) => void;
  };
}

export interface ProfileHolderProps {
  username: string;
  description: string;
  editUser: () => void;
}
