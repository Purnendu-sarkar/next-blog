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


router.patch(
    "/:id",
    PostController.updatePost
)

router.delete(
    "/:id",
    PostController.deletePost
)

export const postRouter = router