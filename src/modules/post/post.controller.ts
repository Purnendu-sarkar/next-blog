import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.creatrPost(req.body)
        console.log("Controller from Post controller!!");
        return res.status(201).json({
            success: true,
            message: "Post Create SuccessFully✅",
            data: result
        })
    } catch (error) {
        console.error("Error in Post controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}



const getAllPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.getAllPost();
        console.log("Controller from Post controller!!");
        return res.status(200).json({
            success: true,
            message: "Post Retrieved SuccessFully🫂",
            data: result
        })
    } catch (error) {
        console.error("Error in Post controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


const getPostById = async (req: Request, res: Response) => {
    try {
        const result = await PostService.getPostById(Number(req.params.id))
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found 🤦‍♂️"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in Post controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


const updatepost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.updatePost(Number(req.params.id), req.body)
        console.log("Controller from Post controller!!");

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post updated successfully ✅",
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


const deletePost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.deletePost(Number(req.params.id))
        console.log("Controller from Post controller!!");

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


export const PostController = {
    createPost,
    getAllPost,
    getPostById,
    updatepost,
    deletePost
}