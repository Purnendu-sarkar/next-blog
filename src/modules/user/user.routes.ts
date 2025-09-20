import express from 'express';
import { userController } from './user.contoller';


const router = express.Router();


router.get(
    "/",
    userController.getAllUsers
);
router.get(
    "/:id",
    userController.getUserById
);


router.post(
    "/",
    userController.createUser
)

export const userRouter = router;