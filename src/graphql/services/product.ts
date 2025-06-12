import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";
import { type Department, type DepartmentCategory, type Product, type ProductCategory } from "../../types/product";

export const ProductService = {
  searchProducts: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const products: Product[] = await prisma.product.findMany({
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

    if (!products || products.length === 0) {
      throw new ErrorService.NotFoundError("No se han encontrado productos que coincidan con la búsqueda.");
    }

    return products;
  },
  searchProductCategories: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const productCategories: ProductCategory[] = await prisma.productCategory.findMany({
      where: {
        OR: [
          {
            productCategory: {
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

    if (!productCategories || productCategories.length === 0) {
      throw new ErrorService.NotFoundError(
        "No se han encontrado categorías de productos que coincidan con la búsqueda.",
      );
    }

    return productCategories;
  },
  searchDepartments: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const departments: Department[] = await prisma.department.findMany({
      where: {
        department: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });

    if (!departments || departments.length === 0) {
      throw new ErrorService.NotFoundError("No se han encontrado departamentos que coincidan con la búsqueda.");
    }

    return departments;
  },
  searchDepartmentCategories: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const departmentCategories: DepartmentCategory[] = await prisma.departmentCategory.findMany({
      where: {
        departmentCategory: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });

    if (!departmentCategories || departmentCategories.length === 0) {
      throw new ErrorService.NotFoundError(
        "No se han encontrado categorías de departamentos que coincidan con la búsqueda.",
      );
    }

    return departmentCategories;
  },
  getProductById: async ({ id }: { id: number }) => {
    const product: Product | null = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ErrorService.NotFoundError("Producto no encontrado.");
    }

    return product;
  },
  getProductCategoryById: async ({ id }: { id: number }) => {
    const productCategory: ProductCategory | null = await prisma.productCategory.findUnique({
      where: {
        id,
      },
    });

    if (!productCategory) {
      throw new ErrorService.NotFoundError("Categoría de producto no encontrada.");
    }

    return productCategory;
  },
  getDepartmentById: async ({ id }: { id: number }) => {
    const department: Department | null = await prisma.department.findUnique({
      where: {
        id,
      },
    });

    if (!department) {
      throw new ErrorService.NotFoundError("Departamento no encontrado.");
    }

    return department;
  },
  getDepartmentCategoryById: async ({ id }: { id: number }) => {
    const departmentCategory: DepartmentCategory | null = await prisma.departmentCategory.findUnique({
      where: {
        id,
      },
    });

    if (!departmentCategory) {
      throw new ErrorService.NotFoundError("Categoría de departamento no encontrada.");
    }

    return departmentCategory;
  },
};
