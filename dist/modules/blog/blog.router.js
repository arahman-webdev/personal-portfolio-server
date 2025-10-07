"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post('/', multer_config_1.upload.single("thumbnail"), blog_controller_1.blogController.createPost);
router.get('/', blog_controller_1.blogController.getAllPosts);
router.delete('/:id', blog_controller_1.blogController.deletePost);
router.put('/:id', multer_config_1.upload.single("thumbnail"), blog_controller_1.blogController.updatePost);
router.get('/:id', blog_controller_1.blogController.getSinglePost);
exports.blogRouter = router;
