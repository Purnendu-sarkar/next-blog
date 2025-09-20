import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        res.send(result);
    } catch (error) {
        console.error("Error in user controller:", error);
    }
}


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        res.send(result);
    } catch (error) {
        console.error("Error in user controller:", error);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserById(Number(req.params.id))
        res.send(result)
    } catch (error) {
        console.error("Error in user controller:", error);
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getUserById
};