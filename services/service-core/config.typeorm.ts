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

import {TypeOrmModuleOptions} from '@nestjs/typeorm'

const pass = '1234';

export const configTypeORM: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: pass,
    database: 'humanitech: supply-trail',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
}