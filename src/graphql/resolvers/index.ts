import { SearchResolver } from "./search";

export const resolvers = {
  Query: {
    ...SearchResolver.Query,
  },
  Product: {
    __resolveReference: SearchResolver.Product.__resolveReference,
  },
  ProductCategory: {
    __resolveReference: SearchResolver.ProductCategory.__resolveReference,
  },
};
