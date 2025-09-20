const createUser = async (payload: any) => {
    // Function implementation
    console.log({ message: "User created", payload });
    return payload;
}
export const userService = {
    createUser
};