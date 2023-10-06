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
      throw new Error('Failed to fetch JWKS'); // Propagate the error here
    }
  }

  async getUser(token: string) {
    try {
      const publicKey = await this.getPublicKey();
      const decodedToken = jwt.verify(token, publicKey, {
        algorithms: ['RS256']
      });

      const data = {
        id: decodedToken['sid'],
        firstName: decodedToken['given_name'],
        lastName: decodedToken['family_name'],
        email: decodedToken['email'],
        username: decodedToken['preferred_username']
      };
      return data;
    } catch (error) {
      throw error; // Propagate the error here
    }
  }
}
