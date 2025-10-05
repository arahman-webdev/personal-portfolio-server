"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const blog_router_1 = require("./modules/blog/blog.router");
const auth_router_1 = require("./modules/auth/auth.router");
const project_router_1 = require("./modules/project/project.router");
exports.app = (0, express_1.default)();
// Middleware------------------
exports.app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://abdurrahmandev-phi.vercel.app'],
    credentials: true
}));
exports.app.use((0, compression_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// router 
exports.app.use('/api/v1/post', blog_router_1.blogRouter);
exports.app.use('/api/v1/auth', auth_router_1.authRouter);
exports.app.use('/api/v1/project', project_router_1.projectRouter);
// Default route testing
exports.app.get('/', (req, res) => {
    res.send("Server is running");
});
