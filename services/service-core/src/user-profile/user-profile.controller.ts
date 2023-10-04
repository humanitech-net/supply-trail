import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserProfileController {
  @Get()
  userProfile(@Query('token') token: string) {
    const publicKey =
      '-----BEGIN PUBLIC KEY-----\nPUBLICK_KEY\n-----END PUBLIC KEY-----';
    const decodedToken = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    });
    return decodedToken;
  }
}
