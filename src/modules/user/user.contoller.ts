import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User Create SuccessFully",
            data: result
        })
    } catch (error) {
        console.error("Error in user controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users Retrieved successfully",
            data: result
        })
    } catch (error) {
        console.error("Error in user controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserById(Number(req.params.id))
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User Not Found 🤦‍♂️"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in user controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getUserById
};