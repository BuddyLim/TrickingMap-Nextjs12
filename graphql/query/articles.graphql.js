import { request, gql } from "graphql-request";

export const QUERY_ALL_ARTICLES = gql`
  {
    allArticles {
      edges {
        node {
          title
          slug
          coverImageWithText{
            file
          }
          articleSubCategory{
            slug
            articleCategory{
              slug
            }
          }
        }
      }
    }
  }
`;
