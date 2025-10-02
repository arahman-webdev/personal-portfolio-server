import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const result = await prisma.blog.create({
        data: payload,
    })

    return result
}



export const blogService = {
    createPost
}