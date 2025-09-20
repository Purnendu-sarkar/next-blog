import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser();
        console.log("Controller from user controller!!");
    } catch (error) {
        console.error("Error in user controller:", error);
    }
}

export const userController = {
    createUser
};