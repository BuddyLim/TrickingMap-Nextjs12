import { QUERY_ALL_ARTICLES } from "../graphql/query/articles.graphql";
import { fetchAPI } from "./common.api";

export async function getAllArticles() {
  const data = await fetchAPI(QUERY_ALL_ARTICLES)

  return data
}
