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

import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "@mui/material";

export const Connection = gql`
  query {
    findAll {
      id
      firstName
    }
  }
`;

const GraphQlButton: React.FC = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const { error, data, refetch } = useQuery(Connection, {
    skip: !isDataFetched,
  });

  const handleButtonClick = () => {
    setIsDataFetched(true);
    refetch();
  };

  if (error) {
    return (
      <div>
        <Button variant="contained" onClick={handleButtonClick}>
          Click Me
        </Button>
        <div className="show">
          [GraphQlButton.handleButtonClick] An error occurred while fetching
          user data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="contained" onClick={handleButtonClick}>
        Click Me
      </Button>
      {isDataFetched && (
        <div className="show">
          <ul>ID: {data?.findAll?.id}</ul>
          <ul>First Name: {data?.findAll?.firstName}</ul>
        </div>
      )}
    </div>
  );
};

export default GraphQlButton;
