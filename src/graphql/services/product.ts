import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";

export const ProductService = {
  searchProducts: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: parsedQuery,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: parsedQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return products;
  },
  getProductById: async ({ id }: { id: number }) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  },
};
