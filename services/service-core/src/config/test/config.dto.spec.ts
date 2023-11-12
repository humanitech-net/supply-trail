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
import {
  AppConfigDto,
  KeycloakConfigurationDto,
  LocalConfigurationDto
} from '../config.dto';
import { validate } from 'class-validator';

describe('AppConfigDto', () => {
  it('should validate a valid AppConfigDto object', async () => {
    const validAppConfigDto = new AppConfigDto();
    validAppConfigDto.keycloak = new KeycloakConfigurationDto();
    validAppConfigDto.database = new LocalConfigurationDto();

    const errors = await validate(validAppConfigDto);

    expect(errors.length).toBe(0);
  });

  it('should invalidate an AppConfigDto object with missing keycloak property', async () => {
    const invalidAppConfigDto = new AppConfigDto();
    invalidAppConfigDto.database = new LocalConfigurationDto();

    const errors = await validate(invalidAppConfigDto);

    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('keycloak');
    expect(errors[0].constraints.isNotEmpty).toBe(
      'keycloak should not be empty'
    );
  });

  it('should invalidate an AppConfigDto object with missing local property', async () => {
    const invalidAppConfigDto = new AppConfigDto();
    invalidAppConfigDto.keycloak = new KeycloakConfigurationDto();

    const errors = await validate(invalidAppConfigDto);

    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('database');
    expect(errors[0].constraints.isNotEmpty).toBe(
      'database should not be empty'
    );
  });
});
