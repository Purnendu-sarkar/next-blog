import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    // Function implementation
    console.log({ message: "User created", payload });
    const createUser = await prisma.user.create({
        data: payload
    });
    console.log(createUser);
    return createUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true,
            isVerified: true
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            posts: true
        }
    });
    return users;
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        omit: {
            password: true,
            isVerified: true
        }
    })
    return result;
}

const updateUser = async (id: number, payload: Partial<User>) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result;
}


export const userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};