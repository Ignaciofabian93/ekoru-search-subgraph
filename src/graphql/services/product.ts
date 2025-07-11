import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";
import { type Department, type DepartmentCategory, type Product, type ProductCategory } from "../../types/product";

export const ProductService = {
  searchProducts: async (query: string) => {
    try {
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
              size: true,
              weightUnit: true,
              averageWeight: true,
              firstMaterialTypeId: true,
              firstMaterialTypeQuantity: true,
              firstMaterialType: {
                select: {
                  id: true,
                  materialType: true,
                  estimatedCo2SavingsKG: true,
                  estimatedWaterSavingsLT: true,
                },
              },
              secondMaterialTypeId: true,
              secondMaterialTypeQuantity: true,
              secondMaterialType: {
                select: {
                  id: true,
                  materialType: true,
                  estimatedCo2SavingsKG: true,
                  estimatedWaterSavingsLT: true,
                },
              },
              thirdMaterialTypeId: true,
              thirdMaterialTypeQuantity: true,
              thirdMaterialType: {
                select: {
                  id: true,
                  materialType: true,
                  estimatedCo2SavingsKG: true,
                  estimatedWaterSavingsLT: true,
                },
              },
              fourthMaterialTypeId: true,
              fourthMaterialTypeQuantity: true,
              fourthMaterialType: {
                select: {
                  id: true,
                  materialType: true,
                  estimatedCo2SavingsKG: true,
                  estimatedWaterSavingsLT: true,
                },
              },
              fifthMaterialTypeId: true,
              fifthMaterialTypeQuantity: true,
              fifthMaterialType: {
                select: {
                  id: true,
                  materialType: true,
                  estimatedCo2SavingsKG: true,
                  estimatedWaterSavingsLT: true,
                },
              },
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
    } catch (error) {
      console.error("Error al buscar productos:", error);
      throw new ErrorService.InternalServerError("Error al buscar productos.");
    }
  },
  searchProductCategories: async (query: string) => {
    try {
      const parsedQuery = query.toLowerCase().trim();
      const productCategories: ProductCategory[] = await prisma.productCategory.findMany({
        select: {
          id: true,
          productCategoryName: true,
          departmentCategoryId: true,
          keywords: true,
          size: true,
          weightUnit: true,
          averageWeight: true,
          firstMaterialTypeId: true,
          firstMaterialTypeQuantity: true,
          firstMaterialType: {
            select: {
              id: true,
              materialType: true,
              estimatedCo2SavingsKG: true,
              estimatedWaterSavingsLT: true,
            },
          },
          secondMaterialTypeId: true,
          secondMaterialTypeQuantity: true,
          secondMaterialType: {
            select: {
              id: true,
              materialType: true,
              estimatedCo2SavingsKG: true,
              estimatedWaterSavingsLT: true,
            },
          },
          thirdMaterialTypeId: true,
          thirdMaterialTypeQuantity: true,
          thirdMaterialType: {
            select: {
              id: true,
              materialType: true,
              estimatedCo2SavingsKG: true,
              estimatedWaterSavingsLT: true,
            },
          },
          fourthMaterialTypeId: true,
          fourthMaterialTypeQuantity: true,
          fourthMaterialType: {
            select: {
              id: true,
              materialType: true,
              estimatedCo2SavingsKG: true,
              estimatedWaterSavingsLT: true,
            },
          },
          fifthMaterialTypeId: true,
          fifthMaterialTypeQuantity: true,
          fifthMaterialType: {
            select: {
              id: true,
              materialType: true,
              estimatedCo2SavingsKG: true,
              estimatedWaterSavingsLT: true,
            },
          },
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
    } catch (error) {
      console.error("Error al buscar categorías de productos:", error);
      throw new ErrorService.InternalServerError("Error al buscar categorías de productos.");
    }
  },
  searchDepartments: async (query: string) => {
    try {
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
    } catch (error) {
      console.error("Error al buscar departamentos:", error);
      throw new ErrorService.InternalServerError("Error al buscar departamentos.");
    }
  },
  searchDepartmentCategories: async (query: string) => {
    try {
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
    } catch (error) {
      console.error("Error al buscar categorías de departamentos:", error);
      throw new ErrorService.InternalServerError("Error al buscar categorías de departamentos.");
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
  getDepartmentById: async ({ id }: { id: number }) => {
    try {
      const department: Department | null = await prisma.department.findUnique({
        where: {
          id,
        },
      });

      if (!department) {
        throw new ErrorService.NotFoundError("Departamento no encontrado.");
      }

      return department;
    } catch (error) {
      console.error("Error al obtener el departamento:", error);
      throw new ErrorService.InternalServerError("Error al obtener el departamento.");
    }
  },
  getDepartmentCategoryById: async ({ id }: { id: number }) => {
    try {
      const departmentCategory: DepartmentCategory | null = await prisma.departmentCategory.findUnique({
        where: {
          id,
        },
      });

      if (!departmentCategory) {
        throw new ErrorService.NotFoundError("Categoría de departamento no encontrada.");
      }

      return departmentCategory;
    } catch (error) {
      console.error("Error al obtener la categoría de departamento:", error);
      throw new ErrorService.InternalServerError("Error al obtener la categoría de departamento.");
    }
  },
};
