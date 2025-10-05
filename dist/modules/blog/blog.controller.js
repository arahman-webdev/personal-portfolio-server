"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_service_1 = require("./blog.service");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const uploadToCloudinary_1 = require("../../config/uploadToCloudinary");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        // If data came via FormData → parse stringified JSON
        if (data.data && typeof data.data === "string") {
            data = JSON.parse(data.data);
        }
        const { title, content, excerpt, published } = data;
        if (!title || !content) {
            throw new AppError_1.default(400, "Title and content are required");
        }
        let thumbnail = null;
        let thumbnailId = null;
        if (req.file) {
            const uploaded = yield (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "blogs");
            thumbnail = uploaded.secure_url;
            thumbnailId = uploaded.public_id;
        }
        const blog = yield blog_service_1.blogService.createPost({
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
    }
    catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Failed to create post",
        });
    }
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        console.log(page, limit);
        const allPosts = yield blog_service_1.blogService.getAllPosts({
            page,
            limit
        });
        res.status(201).json({
            success: true,
            message: "Posts retrieved successfully",
            data: allPosts
        });
    }
    catch (err) {
        console.log(err);
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.id);
        const result = yield blog_service_1.blogService.deletePost(postId);
        res.status(201).json({
            success: true,
            message: "Deleted successfully",
            data: null
        });
    }
    catch (err) {
        console.log(err);
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = Number(req.params.id);
        let body = req.body;
        // If `data` was sent as string (form-data case), parse it
        if (typeof body.data === "string") {
            body = JSON.parse(body.data);
        }
        const result = yield blog_service_1.blogService.updatePost(postId, body, req.file);
        res.status(201).json({
            success: true,
            message: "Updated successfully",
            data: result
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.blogController = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost
};
