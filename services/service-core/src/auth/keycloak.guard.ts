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

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const publicKey = this.configService
      .get('KEYCLOAK_PUBLIC_KEY')
      .replace(/\\n/g, '\n');
    const isHttpContext = context.getType() === 'http';
    if (isHttpContext) {
      const request = context.switchToHttp().getRequest();
      const httpAuthorizationHeader = request.headers.authorization;

      if (httpAuthorizationHeader) {
        return this.validateToken(httpAuthorizationHeader, publicKey);
      }
      return false;
    }

    const GraphQlContext = GqlExecutionContext.create(context);
    const { req } = GraphQlContext.getContext();
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      return this.validateToken(authorizationHeader, publicKey);
    }
    return false;
  }

  validateToken(authorizationHeader: string, publicKey: string): boolean {
    const token = authorizationHeader.split(' ')[1];
    try {
      jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      return true;
    } catch (error) {
      return false;
    }
  }
}
