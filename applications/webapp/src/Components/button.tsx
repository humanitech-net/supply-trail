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

const GraphQlButton: React.FC = () => {
  const query = gql`
    query {
      findAll {
        id
        firstName
      }
    }
  `;
  const [isDataFetched, setIsDataFetched] = useState(false);

  const { error, data, refetch } = useQuery(query, {
    skip: !isDataFetched,
  });

  const handleButtonClick = () => {
    setIsDataFetched(true);
    refetch();
  };

  if (error) {
    return (
      <div>
        <button onClick={handleButtonClick}>Click Me</button>
        <div className="show">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Click Me</button>
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
