import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithEmailAndPassword(req.body)
        return res.status(200).json({
            success: true,
            message: "User Log In SuccessFully✅",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


const authWithGoogle = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.authWithGoogle(req.body)
        return res.status(200).json({
            success: true,
            message: "User Create SuccessFully✅",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Google authentication failed",
            error: error instanceof Error ? error.message : error

        })
    }
}


export const AuthController = {
    loginWithEmailAndPassword,
    authWithGoogle
}