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

import { User } from '../../database/users/users.entity';

describe('User Entity', () => {
  it('should create user entity', () => {
    const user = new User();
    user.username = 'test';
    user.email = 'test@test.com';

    expect(user.username).toBe('test');
    expect(user.email).toBe('test@test.com');
  });
});
