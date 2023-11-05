import { IsString, IsNotEmpty } from 'class-validator';

export class KeycloakConfigurationDto {
  @IsString()
  @IsNotEmpty()
  authServerUrl: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  realm: string;

  @IsString()
  @IsNotEmpty()
  nestClientId: string;

  @IsString()
  @IsNotEmpty()
  realmUrl: string;

  @IsString()
  @IsNotEmpty()
  adminUrl: string;

  @IsString()
  @IsNotEmpty()
  grantType: string;
}
export class LocalConfigurationDto {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_PORT: string;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DATA: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_ADMIN: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_ADMIN_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  KEYCLOAK_DATA: string;

  @IsString()
  @IsNotEmpty()
  ADMIN_CLIENT_SECRET: string;
}
export class AppConfigDto {
  @IsNotEmpty()
  keycloak: KeycloakConfigurationDto;

  @IsNotEmpty()
  local: LocalConfigurationDto;
}
