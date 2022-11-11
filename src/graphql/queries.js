import { gql } from "@apollo/client";
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query repositories (
      $orderBy: AllRepositoriesOrderBy, 
      $orderDirection: OrderDirection,
      $searchKeyword: String,
      $first: Int,
      $after: String
    ) {
    repositories(
        orderBy: $orderBy, 
        orderDirection: $orderDirection,
        searchKeyword: $searchKeyword,
        first: $first,
        after: $after
      ) {
      edges {
        node {
          ...repositoryBaseFields
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;

export const ME = gql`
  query me($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
              id
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${USER_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query repository(
    $repositoryId: ID!, 
    $first: Int,
    $after: String
    ) {
    repository(id: $repositoryId) {
      ...repositoryBaseFields
      ratingAverage
      reviewCount
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;