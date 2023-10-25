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
import { Config } from './config';
import { UpdateUser } from 'src/graphql/users/users.entity';

@Injectable()
export class KeycloakService {
  constructor(private readonly configService: ConfigService) {}
  private readonly adminUrl = this.configService.get('keycloak.adminUrl');
  private readonly realmUrl = this.configService.get('keycloak.realmUrl');
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
      username: this.configService.get(Config.keycloakAdmin),
      password: this.configService.get(Config.keycloakAdminPassword),
      grant_type: this.configService.get('keycloak.grantType'),
      client_id: this.configService.get('keycloak.clientId'),
      client_secret: this.configService.get(Config.adminClientSecret)
    });

    const requestBody = params.toString();
    try {
      const getTokenData = await fetch(
        `${this.realmUrl}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        }
      );

      if (!getTokenData.ok) {
        throw new Error('Error: Fetch error');
      }

      const tokenData = await getTokenData.json();
      return tokenData.access_token;
    } catch (error) {
      throw new Error('Error: Fetch error');
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

  async editUser(id: string, userInput: UpdateUser) {
    const accessToken = await this.getAdminToken();
    if (
      userInput.firstName?.trim() === '' ||
      userInput.lastName?.trim() === '' ||
      userInput.username?.trim() === ''
    ) {
      throw new Error('Please enter an appropriate input');
    }

    if (!userInput.firstName && !userInput.lastName && !userInput.username) {
      throw new Error('At least one field must be provided for the update.');
    }

    const updateUser = await fetch(`${this.adminUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(userInput)
    });

    return updateUser.ok
      ? 'Successfully Updated'
      : 'Try again, failed to update';
  }
}
