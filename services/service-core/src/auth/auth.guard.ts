import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authHeader = req.headers.authorization;

    const public_key =
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmfcwdGUloRZxG5R+K5kttMdSLLP3HnPPzC4eJZcd7M3h+0m4jy/F/edUEPf3DCI/3J/iw7AHUVIzHVhV2dF0xlGv2pxhlbIYgT4M2OUtZXxjJscJsbGHrgVp0nFpUFcengiPpbWLIJk10z7wFSuVg99NkKfHvZgZ8vcG02+dipRFTPWkia+94BPZ7JfJZev0QhwlVSusxR3MoqbpYhiiWEoQ16L5GmtxDoeLYT3dFQCy9FgEIo6hSdawcfxO+NN32O48AKGeH9bNJ7ZqafCt7bX2H2HWJ9ugk98zLk50J1ceGPN7Cbv8VibFco3GDQLitBf3sqmQ5AOjuz3sOkhn8QIDAQAB';
    const key = `-----BEGIN PUBLIC KEY-----\n${public_key}\n-----END PUBLIC KEY-----`;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, key, { algorithms: ['RS256'] });
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
