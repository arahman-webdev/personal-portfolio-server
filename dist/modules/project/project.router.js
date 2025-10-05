"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post('/', multer_config_1.upload.single("thumbnail"), project_controller_1.projectController.createProject);
exports.projectRouter = router;
