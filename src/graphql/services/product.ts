import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";
import { type Product, type ProductCategory } from "../../types/product";

export const ProductService = {
  searchProducts: async (query: string) => {
    try {
      const parsedQuery = query.toLowerCase().trim();
      const products = await prisma.product.findMany({
        select: { id: true },
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

      return products ?? [];
    } catch (error) {
      console.error("Error al buscar productos:", error);
      throw new ErrorService.InternalServerError("Error al buscar productos.");
    }
  },
  searchProductCategories: async (query: string) => {
    try {
      const parsedQuery = query.toLowerCase().trim();
      const productCategories = await prisma.productCategory.findMany({
        select: { id: true },
        where: {
          OR: [
            {
              productCategoryName: {
                contains: parsedQuery,
                mode: "insensitive",
              },
            },
            {
              keywords: {
                has: parsedQuery,
              },
            },
          ],
        },
      });

      return productCategories ?? [];
    } catch (error) {
      console.error("Error al buscar categorías de productos:", error);
      throw new ErrorService.InternalServerError("Error al buscar categorías de productos.");
    }
  },
  getProductById: async ({ id }: { id: number }) => {
    try {
      const product: Product | null = await prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) {
        throw new ErrorService.NotFoundError("Producto no encontrado.");
      }

      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw new ErrorService.InternalServerError("Error al obtener el producto.");
    }
  },
  getProductCategoryById: async ({ id }: { id: number }) => {
    try {
      const productCategory: ProductCategory | null = await prisma.productCategory.findUnique({
        where: {
          id,
        },
      });

      if (!productCategory) {
        throw new ErrorService.NotFoundError("Categoría de producto no encontrada.");
      }

      return productCategory;
    } catch (error) {
      console.error("Error al obtener la categoría de producto:", error);
      throw new ErrorService.InternalServerError("Error al obtener la categoría de producto.");
    }
  },
};
