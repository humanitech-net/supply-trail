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

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import {
  keycloakConfigSchema,
  IKeycloakConfiguration,
  ILocalConfiguration,
  localConfigSchema
} from './config.validator';
import Joi from 'joi';

interface IAppConfiguration {
  keycloak: IKeycloakConfiguration;
  local: ILocalConfiguration;
}

export class CustomConfigService {
  private readonly configuration: IAppConfiguration;

  constructor() {
    this.configuration = this.loadConfiguration();
  }

  private loadConfiguration(): IAppConfiguration {
    const config = yaml.load(
      readFileSync(join(__dirname, './config.yaml'), 'utf8')
    ) as Record<string, unknown>;

    const { error: configError, value: configValue } =
      keycloakConfigSchema.validate(config.keycloak);

    if (configError) {
      throw new Error(`Config validation error: ${configError.message}`);
    }

    const keycloakConfig: IKeycloakConfiguration = configValue;

    const local = {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,
      POSTGRES_DATA: process.env.POSTGRES_DATA,
      KEYCLOAK_ADMIN: process.env.KEYCLOAK_ADMIN,
      KEYCLOAK_ADMIN_PASSWORD: process.env.KEYCLOAK_ADMIN_PASSWORD,
      KEYCLOAK_DATA: process.env.KEYCLOAK_DATA,
      ADMIN_CLIENT_SECRET: process.env.ADMIN_CLIENT_SECRET
    };

    const { error: localError, value: localValue } =
      localConfigSchema.validate(local);

    if (localError) {
      throw new Error(`Config validation error: ${localError.message}`);
    }

    const localConfig: ILocalConfiguration = localValue;

    return {
      keycloak: keycloakConfig,
      local: localConfig
    };
  }

  getKcConfig(): IKeycloakConfiguration {
    return this.configuration.keycloak;
  }

  getLocalConfig(): ILocalConfiguration {
    return this.configuration.local;
  }
}
