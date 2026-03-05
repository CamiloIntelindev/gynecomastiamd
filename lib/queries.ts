/**
 * Queries GraphQL reutilizables
 */

export const GET_SITE_INFO = `
  query GetSiteInfo {
    generalSettings {
      title
      description
      url
    }
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
        id
        title
        excerpt
        slug
        date
        featured
      }
    }
  }
`;
