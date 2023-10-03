import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserProfileService {
  private baseUrl =
    'https://dev.supply-trail.humanitech.net/auth/realms/humanitech';

  async getAdminAccessToken(username: string, password: string) {
    const url = `${this.baseUrl}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      grant_type: 'password',
      client_id: 'supply-trail-app',
      username: 'ciam_admin',
      password: 'CcGY{c3EsGNP\\196'
    });

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error obtaining admin access token: ${error.message}`);
    }
  }

  async refreshAdminAccessToken(refreshToken: string) {
    const url = `${this.baseUrl}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: 'admin-cli',
      refresh_token: refreshToken
    });

    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error refreshing admin access token: ${error.message}`);
    }
  }
}
