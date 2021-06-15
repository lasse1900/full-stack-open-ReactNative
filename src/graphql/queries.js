import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query ($orderBy: AllRepositoriesOrderBy $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
      }
    }
  }
}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      createdAt
      fullName
      description
      language
      forksCount
      name
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      stargazersCount
      url
        reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;