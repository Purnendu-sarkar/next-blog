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

export const PostService = {
    creatrPost
}