import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const creatrPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
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

const getAllPost = async () => {
    const post = await prisma.post.findMany(
        // {
        //     include: {
        //         author: {
        //             select: {
        //                 id: true,
        //                 name: true,
        //                 email: true
        //             }
        //         }
        //     }
        // }
    )
    return post
}

export const PostService = {
    creatrPost,
    getAllPost
}