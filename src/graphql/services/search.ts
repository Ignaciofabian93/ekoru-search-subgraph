import { type Product, type ProductCategory } from "../../types/product";
import { ProductService } from "./product";

export const SearchService = {
  searchResult: async ({ query }: { query: string }) => {
    try {
      const [products, productCategories] = await Promise.all([
        ProductService.searchProducts(query),
        ProductService.searchProductCategories(query),
      ]);

      const typedProducts = products.map((p: Pick<Product, "id">) => ({ __typename: "Product", id: p.id }));
      const typedProductCategories = productCategories.map((p: Pick<ProductCategory, "id">) => ({
        __typename: "ProductCategory",
        id: p.id,
      }));

      return [...typedProducts, ...typedProductCategories];
    } catch (error) {
      console.error("Error al obtener resultados de búsqueda:", error);
      throw new Error("Error al obtener resultados de búsqueda.");
    }
  },
};
