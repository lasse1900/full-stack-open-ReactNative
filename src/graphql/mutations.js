import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput){
    createUser(user: $user){
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($inputs: CreateReviewInput){
    createReview(review: $inputs){
      id
      repositoryId
    }
  }
`;