import { NextFunction, Request, Response } from "express";
import { blogService } from "./blog.service";
import AppError from "../../errorHelper/AppError";
import { uploadToCloudinary } from "../../config/uploadToCloudinary";

const createPost = async (req: Request, res: Response) => {
  try {
    let data = req.body;

    // If data came via FormData → parse stringified JSON
    if (data.data && typeof data.data === "string") {
      data = JSON.parse(data.data);
    }

    const { title, content, excerpt, published } = data;

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
      excerpt,
      thumbnail,
      thumbnailId,
      published: published === "true" || published === true,
    });

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to create post",
    });
  }
};


const getAllPosts = async (req: Request, res: Response) => {
  try {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
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


const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const post = await blogService.getSinglePost(postId)

    res.status(201).json({
      success: true,
      message: "Posts retrieved successfully",
      data: post
    })
  } catch (err) {
    console.log(err)
    next(err)
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


const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id)

    let body = req.body;

    // If `data` was sent as string (form-data case), parse it
    if (typeof body.data === "string") {
      body = JSON.parse(body.data);
    }

    const result = await blogService.updatePost(postId, body, req.file)

    res.status(201).json({
      success: true,
      message: "Updated successfully",
      data: result
    })
  } catch (err) {
    console.log(err)
  }
}


export const blogController = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getSinglePost
};
