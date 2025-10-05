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
exports.blogService = void 0;
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const deleteFromCloudinary_1 = require("../../config/deleteFromCloudinary");
const uploadToCloudinary_1 = require("../../config/uploadToCloudinary");
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.create({
        data: payload,
    });
    return result;
});
const getAllPosts = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit }) {
    const skip = (page - 1) * limit;
    const allPosts = yield db_1.prisma.blog.findMany({
        skip,
        take: limit
    });
    return allPosts;
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.findUnique({
        where: { id }
    });
    if (!blog) {
        throw new AppError_1.default(404, "Blog not found");
    }
    if (blog.thumbnailId) {
        yield (0, deleteFromCloudinary_1.deleteFromCloudinary)(blog.thumbnailId);
    }
    yield db_1.prisma.blog.delete({ where: { id } });
    return true;
});
const updatePost = (id, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    const blogPost = yield db_1.prisma.blog.findUnique({
        where: { id }
    });
    if (!blogPost) {
        throw new AppError_1.default(404, "Blog not found");
    }
    let thumbnail = blogPost.thumbnail;
    let thumbnailId = blogPost.thumbnailId;
    if (file) {
        if (thumbnailId) {
            yield (0, deleteFromCloudinary_1.deleteFromCloudinary)(thumbnailId);
        }
        const uploaded = yield (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "blogs");
        thumbnail = uploaded.secure_url;
        thumbnailId = uploaded.public_id;
    }
    const result = yield db_1.prisma.blog.update({
        where: {
            id,
        },
        data: Object.assign(Object.assign({}, data), { thumbnail,
            thumbnailId })
    });
    return result;
});
exports.blogService = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost
};
