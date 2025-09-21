import express from 'express';
import { PostController } from './post.controller';
const router = express.Router()

router.get(
    "/",
    PostController.getAllPost
)

router.get(
    "/:id",
    PostController.getPostById
)

router.post(
    "/",
    PostController.createPost
)

export const postRouter = router