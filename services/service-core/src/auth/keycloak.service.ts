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
import { UpdateUser, Users } from 'src/graphql/users/users.entity';
import { userInputValidator } from './keycloak.validator';
import { User } from 'src/database/users/users.entity';

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

  async getDecodedToken(token: string) {
    const publicKey = await this.getPublicKey();
    const decodedToken = verify(token, publicKey, {
      algorithms: ['RS256']
    });
    return decodedToken;
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

  async getUser(token: string): Promise<Users> {
    const adminToken = await this.getAdminToken();
    const userInfo = await this.getDecodedToken(token);
    try {
      const response = await fetch(`${Config.adminUrl}/users/${userInfo.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Keycloak API request failed with status ${response.status}. Details: ${errorMessage}`
        );
      }

      const { id, firstName, lastName, username, email } =
        await response.json();
      return {
        id,
        firstName,
        lastName,
        username,
        email
      };
    } catch (error) {
      throw new Error(`Keycloak API request failed: ${error.message}`);
    }
  }

  async editUser(token: string, userInput: UpdateUser): Promise<Users> {
    const accessToken = await this.getAdminToken();
    const userInfo = await this.getDecodedToken(token);

    const { error } = userInputValidator.validate(userInput);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const updateUser = await fetch(`${Config.adminUrl}/users/${userInfo.sub}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(userInput)
    });
    if (!updateUser.ok) {
      const errorMessage = await updateUser.text();
      throw new Error(
        `Keycloak API request failed with status ${updateUser.status}. Details: ${errorMessage}`
      );
    }
    const user = await this.getUser(token);
    return user;
  }
}
