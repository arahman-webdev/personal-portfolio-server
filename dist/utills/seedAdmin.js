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
exports.seedAdmin = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in env");
        }
        const isAdminExist = yield db_1.prisma.user.findUnique({
            where: { email: process.env.ADMIN_EMAIL },
        });
        if (isAdminExist) {
            console.log("Admin already exists");
            return isAdminExist;
        }
        console.log("Creating super admin...");
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        if (isNaN(saltRounds))
            throw new Error("Invalid BCRYPT_SALT_ROUNDS");
        const hashAdminPass = yield bcrypt_1.default.hash(process.env.ADMIN_PASSWORD, saltRounds);
        const payload = {
            name: "Admin",
            role: "ADMIN",
            email: process.env.ADMIN_EMAIL,
            password: hashAdminPass,
        };
        const admin = yield db_1.prisma.user.create({ data: payload });
        console.log("Super admin created successfully:", {
            id: admin.id,
            email: admin.email,
            role: admin.role,
        });
        return admin;
    }
    catch (err) {
        console.error("Failed to seed admin:", err.message);
        throw err;
    }
});
exports.seedAdmin = seedAdmin;
