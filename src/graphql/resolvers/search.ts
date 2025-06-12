import { ProductService } from "../services/product";
import { SearchService } from "../services/search";

export const SearchResolver = {
  Query: {
    search: (_parent: unknown, _args: { query: string }) => SearchService.searchResult(_args),
  },
  Product: {
    __resolveReference: (reference: { id: number }) => ProductService.getProductById(reference),
  },
  ProductCategory: {
    __resolveReference: (reference: { id: number }) => ProductService.getProductCategoryById(reference),
  },
  Department: {
    __resolveReference: (reference: { id: number }) => ProductService.getDepartmentById(reference),
  },
  DepartmentCategory: {
    __resolveReference: (reference: { id: number }) => ProductService.getDepartmentCategoryById(reference),
  },
};
