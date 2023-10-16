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
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  public realmUrl =
    'https://dev.supply-trail.humanitech.net/auth/realms/humanitech';

  constructor(private configService: ConfigService) {}

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

  async changeUserPasswordByAdmin(
    token: string,
    // currentPassword: string,
    newPassword: string
  ): Promise<String> {
    const adminToken = await this.getAdminToken();
    const userId = await this.getUser(token)['id'];
    try {
      // Make an HTTP request to reset the user's password using the admin token.
      const resetPasswordUrl = `https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech/users/${userId}/reset-password`;
      const passwordData = { newPassword };
      const headers = {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      };
      await axios.put(resetPasswordUrl, passwordData, { headers });
      return 'password change secussfully';
    } catch (error) {
      throw new Error("Failed to change the user's password: " + error.message);
    }
  }

  async getAdminToken(): Promise<string> {
    try {
      const adminUsername = this.configService.get<string>('KEYCLOAK_ADMIN');
      const adminPassword = this.configService.get<string>(
        'KEYCLOAK_ADMIN_PASSWORD'
      );
      const keycloakBaseUrl = 'https://dev.supply-trail.humanitech.net/auth';
      const realm = 'master';
      const clientId = 'admin-cli';
      const clientSecret = this.configService.get<string>(
        'ADMIN_CLIENT_SECRET'
      );

      const tokenResponse = await axios.post(
        `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token`,
        `grant_type=password&username=${adminUsername}&password=${adminPassword}&client_id=${clientId}&client_secret=${clientSecret}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (tokenResponse.data.access_token) {
        return tokenResponse.data.access_token;
      } else {
        throw new Error('Failed to obtain an admin token.');
      }
    } catch (error) {
      throw new Error('Failed to obtain an admin token: ' + error.message);
    }
  }
}
