import { Request, Response } from "express";
import { projectService } from "./project.service";
import AppError from "../../errorHelper/AppError";
import { uploadToCloudinary } from "../../config/uploadToCloudinary";

const createProject = async (req: Request, res: Response) => {
  try {
    let { data } = req.body;

    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    const { title, slug, description, features } = data;

    if (!title || !slug || !description || !features) {
      throw new AppError(400, "Title, slug, description, and features are required");
    }

    let thumbnail: string | null = null;
    let thumbnailId: string | null = null;

    if (req.file && req.file.buffer) {
      const uploaded = await uploadToCloudinary(req.file.buffer, "projects");
      thumbnail = uploaded.secure_url;
      thumbnailId = uploaded.public_id;
    }

    const project = await projectService.createProject({
      title,
      slug,
      description,
      features,
      thumbnail,
      thumbnailId,
    });

    res.status(201).json({
      status: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      status: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export const projectController = {
  createProject
}