import { Request, Response } from "express";
import { blogService } from "./blog.service";
import AppError from "../../errorHelper/AppError";
import { uploadToCloudinary } from "../../config/uploadToCloudinary";

const createPost = async (req: Request, res: Response) => {
  try {
    let { data } = req.body;

    // Parse JSON string if exists
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    const { title, content } = data;

    if (!title || !content) {
      throw new AppError(400, "Title and content are required");
    }

    let thumbnail: string | null = null;
    let thumbnailId: string | null = null;

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer, "blogs");
      thumbnail = uploaded.secure_url;
      thumbnailId = uploaded.public_id;
    }

    const blog = await blogService.createPost({
      title,
      content,
      thumbnail,
      thumbnailId,
    });

    res.status(201).json({
      status: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      status: false,
      message: err.message || "Failed to create post",
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 1
    console.log(page, limit)
    const allPosts = await blogService.getAllPosts({
      page,
      limit
    })
    res.status(201).json({
      success: true,
      message: "Posts retrieved successfully",
      data: allPosts
    })
  } catch (err) {
    console.log(err)
  }
}


const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id)
    const result = await blogService.deletePost(postId)

    res.status(201).json({
      success: true,
      message: "Deleted successfully",
      data: null
    })
  } catch (err) {
    console.log(err)
  }
}

export const blogController = {
  createPost,
  getAllPosts,
  deletePost
};
