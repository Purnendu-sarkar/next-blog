import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    //console.log("Post Created✅")
    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return result
}

const getAllPost = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured
}: {
    page?: number
    limit?: number
    search?: string
    isFeatured?: boolean
}) => {
    //console.log({ page, limit })
    console.log("Is Featured :", isFeatured)

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured }
        ].filter(Boolean)
    }
    const skip = (page - 1) * limit;
    const post = await prisma.post.findMany({
        skip,
        take: limit,
        where: where

    })
    return post
}


const getPostById = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return post;
}


const updatePost = async (id: number, payload: Partial<Post>) => {
    const post = await prisma.post.update({
        where: {
            id
        },
        data: payload
    })
    return post;
}


const deletePost = async (id: number) => {
    const post = await prisma.post.delete({
        where: {
            id
        }
    })
    return post;
}

export const PostService = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
}