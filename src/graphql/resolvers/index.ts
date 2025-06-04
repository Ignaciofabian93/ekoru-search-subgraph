import { SearchResolver } from "./search";

export const resolvers = {
  Query: {
    ...SearchResolver.Query,
  },
  User: {
    __resolveReference: SearchResolver.User.__resolveReference,
  },
  Product: {
    __resolveReference: SearchResolver.Product.__resolveReference,
  },
};
