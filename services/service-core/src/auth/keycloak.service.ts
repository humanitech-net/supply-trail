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
import { userInputValidator } from './keycloak.validator';

@Injectable()
export class KeycloakService {
  constructor(private readonly configService: ConfigService) {}

  async getPublicKey() {
    try {
      const response = await axios.get(Config.realmUrl);
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
      grant_type: Config.grantType,
      client_id: Config.clientId,
      client_secret: this.configService.get(Config.adminClientSecret)
    });

    const requestBody = params.toString();
    try {
      const getTokenData = await fetch(
        `${Config.realmUrl}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        }
      );

      if (!getTokenData.ok) {
        throw new Error(getTokenData.statusText);
      }

      const tokenData = await getTokenData.json();
      return tokenData.access_token;
    } catch (error) {
      throw new Error(error.message);
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
    const { error } = userInputValidator.validate(userInput);
    if (error) {
      throw new Error(error.message);
    }

    if (!userInput.firstName && !userInput.lastName && !userInput.username) {
      throw new Error('At least one field must be provided for the update.');
    }

    const updateUser = await fetch(`${Config.adminUrl}/users/${id}`, {
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
