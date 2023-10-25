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

const envConfig = config({ path: './.local.env' });
const jsonConfig = JSON.parse(readFileSync('./src/config/config.json', 'utf8'));

export const configuration = () => ({ ...envConfig, ...jsonConfig });
