import * as Joi from 'joi';

export interface IKeycloakConfiguration {
  authServerUrl: string;
  clientId: string;
  realm: string;
  nestClientId: string;
  realmUrl: string;
  adminUrl: string;
  grantType: string;
}

export interface ILocalConfiguration {
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  POSTGRES_DATA: string;
  KEYCLOAK_ADMIN: string;
  KEYCLOAK_ADMIN_PASSWORD: string;
  KEYCLOAK_DATA: string;
  ADMIN_CLIENT_SECRET: string;
}

export const keycloakConfigSchema = Joi.object<IKeycloakConfiguration>({
  authServerUrl: Joi.string().required(),
  clientId: Joi.string().required(),
  realm: Joi.string().required(),
  nestClientId: Joi.string().required(),
  realmUrl: Joi.string().required(),
  adminUrl: Joi.string().required(),
  grantType: Joi.string().required()
});

export const localConfigSchema = Joi.object<ILocalConfiguration>({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  POSTGRES_DATA: Joi.string().required(),
  KEYCLOAK_ADMIN: Joi.string().required(),
  KEYCLOAK_ADMIN_PASSWORD: Joi.string().required(),
  KEYCLOAK_DATA: Joi.string().required(),
  ADMIN_CLIENT_SECRET: Joi.string().required()
});
