import { type Product, type ProductCategory, type Department, type DepartmentCategory } from "../../types/product";
import { ProductService } from "./product";

export const SearchService = {
  searchResult: async ({ query }: { query: string }) => {
    const [products, productCategories, departments, departmentCategories] = await Promise.all([
      ProductService.searchProducts(query),
      ProductService.searchProductCategories(query),
      ProductService.searchDepartments(query),
      ProductService.searchDepartmentCategories(query),
    ]);

    const typedProducts = products.map((p: Pick<Product, "id">) => ({ __typename: "Product", id: p.id }));
    const typedProductCategories = productCategories.map((p: Pick<ProductCategory, "id">) => ({
      __typename: "ProductCategory",
      id: p.id,
    }));
    const typedDepartments = departments.map((p: Pick<Department, "id">) => ({ __typename: "Department", id: p.id }));
    const typedDepartmentCategories = departmentCategories.map((p: Pick<DepartmentCategory, "id">) => ({
      __typename: "DepartmentCategory",
      id: p.id,
    }));

    return [...typedProducts, ...typedProductCategories, ...typedDepartments, ...typedDepartmentCategories];
  },
};
