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
import { verify } from 'jsonwebtoken';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakService {
  constructor(private readonly configService: ConfigService) {}

  realmUrl = 'https://dev.supply-trail.humanitech.net/auth/realms/humanitech';
  adminUrl =
    'https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech';

  async getPublicKey() {
    try {
      const response = await axios.get(this.realmUrl);
      const publicKey = response.data.public_key;
      return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    } catch (error) {
      throw new Error('Failed to fetch Public Key');
    }
  }

  async getAdminToken() {
    const params = new URLSearchParams({
      username: this.configService.get('ADMIN'),
      password: this.configService.get('ADMIN_PASSWORD'),
      grant_type: 'password',
      client_id: 'nest-application',
      client_secret: this.configService.get('CLIENT_SECRET')
    });

    const requestBody = params.toString();

    try {
      const GetTokenData = await fetch(
        `${this.realmUrl}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        }
      );

      const TokenData = await GetTokenData.json();
      return TokenData.access_token;
    } catch (error) {
      throw error;
    }
  }

  async getUser(token: string) {
    const publicKey = await this.getPublicKey();
    const decodedToken = verify(token, publicKey, {
      algorithms: ['RS256']
    });

    return {
      id: decodedToken['sub'],
      firstName: decodedToken['given_name'],
      lastName: decodedToken['family_name'],
      email: decodedToken['email'],
      username: decodedToken['preferred_username']
    };
  }

  async editUser(id: string, userInput: object) {
    const AccessToken = await this.getAdminToken();

    const updateUser = await fetch(`${this.adminUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AccessToken}`
      },
      body: JSON.stringify(userInput)
    });

    return updateUser.ok
      ? 'Successfully Updated'
      : 'Try again failed to update';
  }
}
