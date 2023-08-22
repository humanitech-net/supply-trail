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

import { gql, useQuery } from '@apollo/client';

export const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

function HelloQuery() {
  const { error, data } = useQuery(HELLO_QUERY);

  if (error) {
    alert(`Error: ${error.message}`);
    return <p>Error: {error.message}</p>;
  }

  return <p>{data.hello}</p>;
}

export default HelloQuery;
