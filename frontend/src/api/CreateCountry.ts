import { gql } from "@apollo/client";

export const mutationCreateCountry = gql(`
mutation CreateCountry($data: NewCountryInput!) {
    createCountry(data: $data) {
      id
      name
      code
      emoji
    }
  }`);
