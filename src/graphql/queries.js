import { gql } from '@apollo/client';

export const GET_TASKS_QUERY = gql`
  query GetTasks {
    tasks {
      id
      name
      complete
    }
  }
`;
