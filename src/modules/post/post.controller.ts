import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.creatrPost(req.body)
        console.log("Controller from user controller!!");
        return res.status(201).json({
            success: true,
            message: "Post Create SuccessFully✅",
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



const getAllPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.getAllPost();
        console.log("Controller from user controller!!");
        return res.status(200).json({
            success: true,
            message: "Post Retrieved SuccessFully🫂",
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


export const PostController = {
    createPost,
    getAllPost
}