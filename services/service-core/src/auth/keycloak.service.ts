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

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  public realmUrl =
    'https://dev.supply-trail.humanitech.net/auth/realms/humanitech';

  async getPublicKey() {
    try {
      const response = await axios.get(this.realmUrl);
      const publicKey = response.data.public_key;
      return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    } catch (error) {
      throw new Error('Failed to fetch Public Key');
    }
  }

  async getUser(token: string) {
    try {
      const publicKey = await this.getPublicKey();
      const decodedToken = jwt.verify(token, publicKey, {
        algorithms: ['RS256']
      });

      return {
        id: decodedToken['sub'],
        firstName: decodedToken['given_name'],
        lastName: decodedToken['family_name'],
        email: decodedToken['email'],
        username: decodedToken['preferred_username']
      };
    } catch (error) {
      throw error;
    }
  }
}
