import {
  AppConfigDto,
  KeycloakConfigurationDto,
  LocalConfigurationDto
} from '../config.dto';
import { IsNotEmpty, IsString, validate } from 'class-validator';

describe('AppConfigDto', () => {
  it('should validate a valid AppConfigDto object', async () => {
    const validAppConfigDto = new AppConfigDto();
    validAppConfigDto.keycloak = new KeycloakConfigurationDto();
    validAppConfigDto.local = new LocalConfigurationDto();

    const errors = await validate(validAppConfigDto);

    expect(errors.length).toBe(0);
  });

  it('should invalidate an AppConfigDto object with missing keycloak property', async () => {
    const invalidAppConfigDto = new AppConfigDto();
    invalidAppConfigDto.local = new LocalConfigurationDto();

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
    expect(errors[0].property).toBe('local');
    expect(errors[0].constraints.isNotEmpty).toBe('local should not be empty');
  });
});
