import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import AppError from "../../errorHelper/AppError"
import { v2 as cloudinary } from "cloudinary"
import { deleteFromCloudinary } from "../../config/deleteFromCloudinary"
const createPost = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const result = await prisma.blog.create({
        data: payload,
    })

    return result
}


const getAllPosts = async ({ page, limit }: { page: number, limit: number }) => {


    const skip = (page - 1) * limit

    const allPosts = await prisma.blog.findMany({
        skip,
        take: limit
    })

    return allPosts
}


const deletePost = async (id: number) => {
    const blog = await prisma.blog.findUnique({
        where: { id }
    })

    if (!blog) {
        throw new AppError(404, "Blog not found")
    }

    if (blog.thumbnailId) {
        await deleteFromCloudinary(blog.thumbnailId)
    }

    await prisma.blog.delete({ where: { id } })

    return true
}


const updatePost = async (id: number, data: Partial<Blog>) => {
    const blogPost = await prisma.blog.findUnique({
        where: { id }
    })

    if (!blogPost) {
        throw new AppError(404, "Blog not found")
    }

    const result = await prisma.blog.update({
        where: {
            id,
        },
        data
    })
}


export const blogService = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost
}