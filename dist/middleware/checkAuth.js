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
exports.checkAuth = exports.Role = void 0;
const jwt_1 = require("../utills/jwt");
const db_1 = require("../config/db");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            throw new AppError_1.default(403, "No token received");
        }
        const verifiedToken = (0, jwt_1.verifyToken)(token, process.env.JWT_ACCESS_SECRET);
        // console.log("✅ Decoded Token:", verifiedToken);
        // console.log("✅ Required Roles:", authRoles);
        console.log("from verified token", verifiedToken);
        const isUserExist = yield db_1.prisma.user.findUnique({ where: { email: verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.useremail } });
        if (!isUserExist) {
            throw new AppError_1.default(404, "User does not exist");
        }
        if (!authRoles.includes(verifiedToken.userRole)) {
            throw new AppError_1.default(403, "You are not permitted to view this route!!!");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("❌ Auth error:", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
