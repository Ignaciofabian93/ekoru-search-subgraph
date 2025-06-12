import gql from "graphql-tag";

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@external"])

  extend type ProductCategory @key(fields: "id") {
    id: ID! @external
  }

  extend type DepartmentCategory @key(fields: "id") {
    id: ID! @external
  }

  extend type Department @key(fields: "id") {
    id: ID! @external
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
  }

  union SearchResult = Product | ProductCategory | Department | DepartmentCategory

  extend type Query {
    search(query: String!): [SearchResult!]!
  }
`;
