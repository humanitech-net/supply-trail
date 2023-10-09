import { gql } from "@apollo/client";

export const query = gql`
  query {
    getUser {
      username
      firstName
      lastName
      email
    }
  }
`;
