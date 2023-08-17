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

import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../users.resolver';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver]
    }).compile();
    usersResolver = module.get<UsersResolver>(UsersResolver);
  });

  describe('findAll', () => {
    it('', () => {
      expect(typeof usersResolver.findAll()).toBe('object');
    });
  });
});
