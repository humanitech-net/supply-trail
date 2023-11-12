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
import { load } from 'js-yaml';
import { join } from 'path';
import { AppConfigDto } from './config.dto';
import { NotFoundException } from '@nestjs/common';

export class CustomConfigService {
  private readonly configuration: AppConfigDto;

  constructor() {
    this.configuration = this.loadConfiguration();
  }

  private loadConfiguration(): AppConfigDto {
    const yamlFilePath = './config.yaml';
    const yamlConfig = load(
      readFileSync(join(__dirname, yamlFilePath), 'utf8')
    ) as AppConfigDto;

    for (const section in yamlConfig) {
      if (yamlConfig && typeof yamlConfig === 'object') {
        for (const key in yamlConfig[section]) {
          if (process.env[key]) {
            yamlConfig[section][key] = process.env[key];
          }
        }
      }
    }

    return yamlConfig;
  }

  get() {
    return this.configuration;
  }
}
