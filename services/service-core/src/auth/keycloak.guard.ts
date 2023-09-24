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
import jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const publicKey =
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwOQB4uDsWbqwZaV8puV7gdyqJvwcme1G+NXO2hL/Hvz+m8L1iKeEcRRmFkQKDVuQGQgoiPIdyEe1vf6inxDFLn75NVj1MDDIg68uneOKCID0mhhQy9r3vbwCVNPjLMGkfn1e9/3LvKY644N8gz8bHKl0yfTcuhlVSPeXWcSIt+lAc8N2zVklxb5gaJGFslJ1aywZU+4lmvcAFjz8o1bHyec/FfGr/nBjxq5WpvH1Rl3j/TFTapAuGA2ot5RcNKnbE8zww+T3zzch4T2RwE+MjQ9WXESfemZOczCeEz1R6F1i4ChNcM2SYmVGE5ranxwgkBiiwk44GefUXwVGERdVuQIDAQAB\n-----END PUBLIC KEY-----';
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
    const request = GraphQlContext.getContext().req;
    const authorizationHeader = request.headers.authorization;

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
