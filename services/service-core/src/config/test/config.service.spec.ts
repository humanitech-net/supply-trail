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

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { configuration } from '../config.service';

jest.mock('dotenv', () => ({
  config: jest.fn(() => ({ DOTENV_VAR: 'dotenv_value' }))
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => '{"JSON_VAR":"json_value"}')
}));

describe('Configuration Module', () => {
  it('should merge environment variables from dotenv and JSON', () => {
    const configResult = configuration();
    expect(configResult).toEqual({
      DOTENV_VAR: 'dotenv_value',
      JSON_VAR: 'json_value'
    });
  });

  it('should call dotenv.config with the correct path', () => {
    configuration();
    expect(config).toHaveBeenCalledWith({ path: './.local.env' });
  });

  it('should call readFileSync with the correct path and encoding', () => {
    configuration();
    expect(readFileSync).toHaveBeenCalledWith(
      './src/config/config.json',
      'utf8'
    );
  });
});
