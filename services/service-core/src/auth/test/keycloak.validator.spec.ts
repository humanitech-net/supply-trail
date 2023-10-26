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

import { userInputValidator } from '../keycloak.validator';
import Joi from 'joi';
const notValid = 'should not validate an invalid user input';
const firstName = 'John';
const lastName = 'Doe';
const username = 'johndoe';

describe('userInputValidator', () => {
  const testCases = [
    {
      description: 'should validate a valid user input',
      input: {
        firstName,
        lastName,
        username
      },
      shouldErrorBeDefined: false
    },
    {
      description: notValid,
      input: {
        firstName: '',
        lastName,
        username
      },
      shouldErrorBeDefined: true
    },
    {
      description: notValid,
      input: {
        firstName,
        lastName: '',
        username
      },
      shouldErrorBeDefined: true
    },
    {
      description: notValid,
      input: {
        firstName,
        lastName,
        username: ''
      },
      shouldErrorBeDefined: true
    },
    {
      description: notValid,
      input: {
        firstName: '',
        lastName: '',
        username: ''
      },
      shouldErrorBeDefined: true
    }
  ];

  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      const { error } = userInputValidator.validate(testCase.input);
      if (testCase.shouldErrorBeDefined) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Joi.ValidationError);
      } else {
        expect(error).toBeUndefined();
      }
    });
  });
});
