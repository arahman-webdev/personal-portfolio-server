import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import AppError from "../../errorHelper/AppError"
import { v2 as cloudinary } from "cloudinary"
import { deleteFromCloudinary } from "../../config/deleteFromCloudinary"
import { uploadToCloudinary } from "../../config/uploadToCloudinary"
const createPost = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const result = await prisma.blog.create({
        data: payload,
    })

    return result
}


const getAllPosts = async ({ page, limit }: { page: number, limit: number }) => {


    const skip = (page - 1) * limit

    const allPosts = await prisma.blog.findMany({
        orderBy:{
            createdAt:"desc"
        },
        skip,
        take: limit
    })

    return allPosts
}


const getSinglePost = async (id:number) => {
    const post = await prisma.blog.findUnique({
        where:{id}
    })

    return post
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


const updatePost = async (id: number, data: Partial<Blog>, file?: Express.Multer.File) => {
    const blogPost = await prisma.blog.findUnique({
        where: { id }
    })

    if (!blogPost) {
        throw new AppError(404, "Blog not found")
    }

    let thumbnail = blogPost.thumbnail
    let thumbnailId = blogPost.thumbnailId

    if (file) {
        if (thumbnailId) {
            await deleteFromCloudinary(thumbnailId)
        }

        const uploaded = await uploadToCloudinary(file.buffer, "blogs");
        thumbnail = uploaded.secure_url;
        thumbnailId = uploaded.public_id;
    }

    const result = await prisma.blog.update({
        where: {
            id,
        },
        data: {
            ...data,
            thumbnail,
            thumbnailId,
        }
    })

    return result
}


export const blogService = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost,
    getSinglePost
}