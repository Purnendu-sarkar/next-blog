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
    isFeatured,
    tags
}: {
    page?: number
    limit?: number
    search?: string
    isFeatured?: boolean
    tags?: string[]
}) => {
    //console.log({ page, limit })
    //console.log("Is Featured :", isFeatured)
    console.log("Tags :", tags)

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }
    const skip = (page - 1) * limit;
    const post = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }

    })
    const total = await prisma.post.count({ where })

    return {
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
        data: post,
    };
}


const getPostById = async (id: number) => {

    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        return await tx.post.findUnique({
            where: { id },
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

    })
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