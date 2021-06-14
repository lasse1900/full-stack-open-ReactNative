import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
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