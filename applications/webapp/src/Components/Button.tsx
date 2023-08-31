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


import React, {useState} from 'react';
import { Button } from '@mui/material';
import { useQuery, gql } from '@apollo/client';

export const Connection = gql`
  query {
    findAll{
      id,
      firstName
    }
  }
`

function GraphQlButton() {

  const [id, setId] = useState(1)
  const [name, setName] = useState("John")

  const { error, data } = useQuery(Connection);

  function handleClick()  {
    if (data) {
      const id = data.findAll.id
      const firstName = data.findAll.firstName;
      setId(id)
      setName(`${firstName}`)
    } else if(error) {
      setName("error")
    }
  }

  return (
    <div>
      <Button variant="contained" data-testid='button' onClick={handleClick}>
        Click Me
      </Button>
      <div className='show'>
        <ul data-testid='id'>{id}</ul>
        <ul data-testid='test'>{name}</ul>
      </div>
    </div>
  );
}

export default GraphQlButton;

