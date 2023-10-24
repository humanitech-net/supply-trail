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

describe('userInputValidator', () => {
    it('should validate a valid user input', () => {
        const validUserInput = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe'
        };
        const { error } = userInputValidator.validate(validUserInput);
        expect(error).toBeUndefined();
    });

    it('should not validate a valid user input', () => {
        const validUserInput = {
            firstName: '',
            lastName: 'Doe',
            username: 'johndoe'
        };
        const { error } = userInputValidator.validate(validUserInput);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Joi.ValidationError);
    });

    it('should not validate a valid user input', () => {
        const validUserInput = {
            firstName: 'John',
            lastName: '',
            username: 'johndoe'
        };
        const { error } = userInputValidator.validate(validUserInput);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Joi.ValidationError);
    });

    it('should not validate a valid user input', () => {
        const validUserInput = {
            firstName: 'John',
            lastName: 'Doe',
            username: ''
        };
        const { error } = userInputValidator.validate(validUserInput);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Joi.ValidationError);
    });



    it('should not validate an invalid user input', () => {
        const invalidUserInput = {
            firstName: '',
            lastName: '',
            username: ''
        };
        const { error } = userInputValidator.validate(invalidUserInput);
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Joi.ValidationError);
    });
});
