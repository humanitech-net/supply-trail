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
    return <div>Error: {error.message}</div>;
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
