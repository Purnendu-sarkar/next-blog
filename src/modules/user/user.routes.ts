import express from 'express';
import { userController } from './user.contoller';


const router = express.Router();


router.get(
    "/",
    userController.getAllUsers
);


router.post(
    "/",
    userController.createUser
)

export const userRouter = router;