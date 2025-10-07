"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middleware/checkAuth");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/me', (0, checkAuth_1.checkAuth)(...Object.values(checkAuth_1.Role)), user_controller_1.UserController.getMe);
exports.userRoutes = router;
