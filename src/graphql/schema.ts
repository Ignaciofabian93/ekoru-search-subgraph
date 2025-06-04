import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@external"])

  extend type Product @key(fields: "id") {
    id: ID! @external
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  union SearchResult = Product | User

  extend type Query {
    search(query: String!): [SearchResult!]!
  }
`;

// extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@external"])

// type Query {
//   search(term: String!, limit: Int = 10, offset: Int = 0): [SearchResult]
//   searchProducts(term: String!, limit: Int = 10, offset: Int = 0): [Product]
//   searchCategories(term: String!, limit: Int = 10, offset: Int = 0): [Category]
//   popularSearches: [String]
// }

// union SearchResult = Product | Category

// # Reference to Product from Products subgraph
// type Product @key(fields: "id") {
//   id: ID!
//   name: String! @external
//   description: String @external
//   price: Float! @external
//   imageUrl: String @external
//   category: Category @external
//   searchScore: Float
//   # This is a field that only exists in the search service
//   searchRelevance: Float
// }

// # Reference to Category from Products subgraph
// type Category @key(fields: "id") {
//   id: ID!
//   name: String! @external
//   description: String @external
//   searchScore: Float
// }
