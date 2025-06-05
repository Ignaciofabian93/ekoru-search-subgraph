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
  searchProductCategories: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const productCategories = await prisma.productCategory.findMany({
      select: {
        id: true,
        productCategory: true,
        departmentCategoryId: true,
      },
      where: {
        productCategory: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });
    return productCategories;
  },
  searchDepartments: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const departments = await prisma.department.findMany({
      select: {
        id: true,
        department: true,
      },
      where: {
        department: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });
    return departments;
  },
  searchDepartmentCategories: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const departmentCategories = await prisma.departmentCategory.findMany({
      select: {
        id: true,
        departmentCategory: true,
        departmentId: true,
      },
      where: {
        departmentCategory: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });
    return departmentCategories;
  },
  getProductById: async ({ id }: { id: number }) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  },
  getProductCategoryById: async ({ id }: { id: number }) => {
    const productCategory = await prisma.productCategory.findUnique({
      where: {
        id,
      },
    });

    return productCategory;
  },
  getDepartmentById: async ({ id }: { id: number }) => {
    const department = await prisma.department.findUnique({
      where: {
        id,
      },
    });

    return department;
  },
  getDepartmentCategoryById: async ({ id }: { id: number }) => {
    const departmentCategory = await prisma.departmentCategory.findUnique({
      where: {
        id,
      },
    });

    return departmentCategory;
  },
};
