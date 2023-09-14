import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const GraphQlcontext = GqlExecutionContext.create(context);

    const { req } = GraphQlcontext.getContext();

    const authorizationHeader = req.headers.authorization;

    const publicKey = this.configService.get<string>('PUBLIC_KEY');

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const decode = jwt.verify(token, publicKey, { algorithm: ['RS256'] });
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
