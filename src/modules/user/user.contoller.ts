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



const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUser(Number(req.params.id), req.body)
        console.log("Controller from user controller!!");

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully ✅",
            data: result,
        });
    } catch (error) {
        console.error("Error in post controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUser(Number(req.params.id))
        console.log("Controller from user controller!!");

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post Deleted successfully ✅",
            data: result,
        });
    } catch (error) {
        console.error("Error in post controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};