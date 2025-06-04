import { ProductService } from "../services/product";
import { SearchService } from "../services/search";
import { UserService } from "../services/user";

export const SearchResolver = {
  Query: {
    search: (_parent: unknown, _args: { query: string }) => SearchService.searchResult(_args.query),
  },
  User: {
    __resolveReference: (reference: { id: string }) => UserService.getUserById(reference),
  },
  Product: {
    __resolveReference: (reference: { id: number }) => ProductService.getProductById(reference),
  },
};
