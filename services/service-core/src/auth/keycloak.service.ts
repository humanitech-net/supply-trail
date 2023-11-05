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
import { CustomConfigService } from '../config/config.service';
import { UpdateUser } from 'src/graphql/users/users.entity';
import { userInputValidator } from './keycloak.validator';

@Injectable()
export class KeycloakService {
  constructor(private readonly configService: CustomConfigService) {}
  private config = this.configService.get();

  async getPublicKey() {
    const { realmUrl } = this.config.keycloak;
    try {
      const response = await axios.get(realmUrl);
      const publicKey = response.data.public_key;
      return `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    } catch (error) {
      throw new Error('Failed to fetch Public Key');
    }
  }

  async getAdminToken() {
    const { KEYCLOAK_ADMIN, KEYCLOAK_ADMIN_PASSWORD, ADMIN_CLIENT_SECRET } =
      this.config.local;
    const { realmUrl, grantType, clientId } = this.config.keycloak;
    const params = new URLSearchParams({
      username: KEYCLOAK_ADMIN,
      password: KEYCLOAK_ADMIN_PASSWORD,
      grant_type: grantType,
      client_id: clientId,
      client_secret: ADMIN_CLIENT_SECRET
    });

    const requestBody = params.toString();
    try {
      const getTokenData = await fetch(
        `${realmUrl}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        }
      );

      if (!getTokenData.ok) {
        throw new Error(
          `[KeycloakService.getAdminToken] Failed to retrieve the admin token. HTTP Status: ${getTokenData.statusText}`
        );
      }

      const tokenData = await getTokenData.json();
      return tokenData.access_token;
    } catch (error) {
      throw new Error(
        `[KeycloakService.getAdminToken] Failed to get the admin token. Error: ${error.message}`
      );
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
    const { adminUrl } = this.config.keycloak;
    const accessToken = await this.getAdminToken();
    const { error } = userInputValidator.validate(userInput);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const updateUser = await fetch(`${adminUrl}/users/${id}`, {
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
