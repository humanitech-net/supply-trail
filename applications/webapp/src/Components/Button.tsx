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

import React from 'react';
import { Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import HelloQuery from '../GraphQL/HelloQuery';


function GraphQlButton() {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  const handleButtonClick = () => {
    if (data && data.hello) {
      alert(`Response from server: ${data.hello}`);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleButtonClick}>
        Click Me
      </Button>
    </div>
  );
}

export default GraphQlButton;

