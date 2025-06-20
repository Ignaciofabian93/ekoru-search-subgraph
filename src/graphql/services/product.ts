import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";
import { type Department, type DepartmentCategory, type Product, type ProductCategory } from "../../types/product";

export const ProductService = {
  searchProducts: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const products: Product[] = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            surnames: true,
            profileImage: true,
            isCompany: true,
            businessName: true,
            phone: true,
            address: true,
            county: {
              select: {
                id: true,
                county: true,
              },
            },
            city: {
              select: {
                id: true,
                city: true,
              },
            },
            region: {
              select: {
                id: true,
                region: true,
              },
            },
          },
        },
        productCategory: {
          select: {
            id: true,
            productCategoryName: true,
            departmentCategoryId: true,
            keywords: true,
            materialImpactEstimateId: true,
            size: true,
            minWeight: true,
            maxWeight: true,
            weightUnit: true,
            departmentCategory: {
              select: {
                id: true,
                departmentCategoryName: true,
                departmentId: true,
                department: {
                  select: {
                    id: true,
                    departmentName: true,
                  },
                },
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
            user: {
              select: {
                id: true,
                name: true,
                businessName: true,
              },
            },
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
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
  },
  searchProductCategories: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const productCategories: ProductCategory[] = await prisma.productCategory.findMany({
      select: {
        id: true,
        productCategoryName: true,
        departmentCategoryId: true,
        keywords: true,
        materialImpactEstimateId: true,
        size: true,
        minWeight: true,
        maxWeight: true,
        weightUnit: true,
        departmentCategory: {
          select: {
            id: true,
            departmentCategoryName: true,
            departmentId: true,
            department: {
              select: {
                id: true,
                departmentName: true,
              },
            },
          },
        },
      },
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
  },
  searchDepartments: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const departments: Department[] = await prisma.department.findMany({
      where: {
        departmentName: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });

    return departments ?? [];
  },
  searchDepartmentCategories: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const departmentCategories: DepartmentCategory[] = await prisma.departmentCategory.findMany({
      select: {
        id: true,
        departmentCategoryName: true,
        departmentId: true,
        department: {
          select: {
            id: true,
            departmentName: true,
          },
        },
      },
      where: {
        departmentCategoryName: {
          contains: parsedQuery,
          mode: "insensitive",
        },
      },
    });

    return departmentCategories ?? [];
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
