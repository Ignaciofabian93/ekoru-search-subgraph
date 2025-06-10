import { ProductService } from "./product";

export const SearchService = {
  searchResult: async ({ query }: { query: string }) => {
    const [products, productCategories, departments, departmentCategories] = await Promise.all([
      ProductService.searchProducts(query),
      ProductService.searchProductCategories(query),
      ProductService.searchDepartments(query),
      ProductService.searchDepartmentCategories(query),
    ]);

    const typedProducts = products.map((p) => ({ __typename: "Product", id: p.id }));
    const typedProductCategories = productCategories.map((p) => ({
      __typename: "ProductCategory",
      id: p.id,
    }));
    const typedDepartments = departments.map((p) => ({ __typename: "Department", id: p.id }));
    const typedDepartmentCategories = departmentCategories.map((p) => ({
      __typename: "DepartmentCategory",
      id: p.id,
    }));

    return [...typedProducts, ...typedProductCategories, ...typedDepartments, ...typedDepartmentCategories];
  },
};
