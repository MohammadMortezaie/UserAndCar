// src/queries/carQueries.js

import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query {
    getCarList {
      id
      name
      year
      make
      model
      price
    }
  }
`;
