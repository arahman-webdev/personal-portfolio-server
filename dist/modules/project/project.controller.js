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
exports.projectController = void 0;
const project_service_1 = require("./project.service");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const uploadToCloudinary_1 = require("../../config/uploadToCloudinary");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data } = req.body;
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        const { title, slug, description, features } = data;
        if (!title || !slug || !description || !features) {
            throw new AppError_1.default(400, "Title, slug, description, and features are required");
        }
        let thumbnail = null;
        let thumbnailId = null;
        if (req.file && req.file.buffer) {
            const uploaded = yield (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "projects");
            thumbnail = uploaded.secure_url;
            thumbnailId = uploaded.public_id;
        }
        const project = yield project_service_1.projectService.createProject({
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
    }
    catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            status: false,
            message: err.message || "Internal Server Error",
        });
    }
});
exports.projectController = {
    createProject
};
