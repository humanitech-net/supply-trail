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
import { useQuery, gql } from '@apollo/client';

const Connection = gql`
  query {
    findAll{
      id,
      firstName
    }
  }
`

function GraphQlButton() {
  const { error, data } = useQuery(Connection);

  const handleClick = () => {
    if (data) {
      alert('Data fetched successfully: ' + JSON.stringify(data));
    } else if (error) {
      alert('Error: ' + error.message);
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}

export default GraphQlButton;

