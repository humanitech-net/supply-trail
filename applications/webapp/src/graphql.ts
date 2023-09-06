import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

function GraphQL() {
  const [isFetched, setIsFecthed] = useState(false);

  const Connection = gql`
    {
      query {
        findAll {
          id
          firstName
        }
      }
    }
  `;

  const { error, data, refetch } = useQuery(Connection);

  return { error, data, refetch, isFetched, setIsFecthed };
}

export default GraphQL;
