import prisma from "../../client/prisma";
import { ErrorService } from "../../errors/errors";

export const UserService = {
  searchUsers: async (query: string) => {
    const parsedQuery = query.toLowerCase().trim();
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surnames: true,
        email: true,
        profileImage: true,
        birthday: true,
        businessName: true,
        address: true,
        phone: true,
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
            email: {
              contains: parsedQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return users;
  },
  getUserById: async ({ id }: { id: string }) => {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        surnames: true,
        email: true,
        profileImage: true,
        birthday: true,
        businessName: true,
        address: true,
        phone: true,
      },
      where: {
        id,
      },
    });

    return user;
  },
};
