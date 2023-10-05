import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  public realmUrl =
    'https://dev.supply-trail.humanitech.net/auth/realms/humanitech';

  async getPUblicKey() {
    try {
      const response = await axios.get(this.realmUrl);
      const publicKey = response.data.public_key;
      return publicKey;
    } catch (error) {
      throw new Error('Failed to fetch JWKS');
    }
  }
  async getUser(token: string) {
    try {
      const publicKey = await this.getPUblicKey();

      const key = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
      const decodedToken = jwt.verify(token, key, { algorithms: ['RS256'] });
      console.log(decodedToken)
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }
}
