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
exports.authControlelr = exports.loginUser = void 0;
const auth_service_1 = require("./auth.service");
const setCookies_1 = require("../../utills/setCookies");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInfo = yield auth_service_1.authService.loginUser(req.body);
        // Set cookies
        (0, setCookies_1.setAuthCookie)(res, loginInfo);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: loginInfo,
        });
    }
    catch (err) {
        console.log(err);
        // Handle AppError specifically
        if (err instanceof AppError_1.default) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            });
        }
        // Fallback for unknown errors
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/"
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/"
    });
    res.status(201).json({
        success: true,
        message: "User logged out successfully",
        data: null
    });
};
exports.authControlelr = {
    loginUser,
    logoutUser
};
