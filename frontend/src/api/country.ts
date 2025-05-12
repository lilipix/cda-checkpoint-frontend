import { gql } from "@apollo/client";

export const queryCountry = gql(`
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      emoji
      code
      continent {
        name
      }
    }
  }
`);
