import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const isHttpContext = context.getType() === 'http';
    if (isHttpContext) {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader = request.headers.authorization;

      const publicKey = this.configService.get<string>('PUBLIC_KEY');

      if (authorizationHeader) {
        return this.validateToken(authorizationHeader, publicKey);
      }
      return false;
    }

    const GraphQlContext = GqlExecutionContext.create(context);

    const { req } = GraphQlContext.getContext();

    const authorizationHeader = req.headers.authorization;

    const publicKey = this.configService.get<string>('PUBLIC_KEY');

    if (authorizationHeader) {
      this.validateToken(authorizationHeader, publicKey);
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
