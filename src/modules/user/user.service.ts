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
export const userService = {
    createUser
};