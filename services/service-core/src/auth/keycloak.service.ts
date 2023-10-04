import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakAuthGuard {
  userdata() {
    const keycloakServer = 'dev.supply-trail.humanitech.net/auth';
    const realmName = 'humanitech';
    fetch(`${keycloakServer}/auth/realms/${realmName}/.well-known/jwks.json`)
      .then((response) => response.json())
      .then((publicKeys) => {
        return publicKeys;
      });
  }
}
