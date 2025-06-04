import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";
import { Product } from "../../types/product";
import { ProductService } from "./product";
import { UserService } from "./user";

export const SearchService = {
  searchResult: async (query: string) => {
    const users = await UserService.searchUsers(query);
    const products = await ProductService.searchProducts(query);

    // Add typename to help with __resolveType
    const typedUsers = users.map((u: any) => ({ __typename: "User", id: u.id }));
    const typedProducts = products.map((p) => ({ __typename: "Product", id: p.id }));
    console.log("typedUsers: ", typedUsers);
    console.log("typedProducts: ", typedProducts);

    return [...typedUsers, ...typedProducts];
  },
};
