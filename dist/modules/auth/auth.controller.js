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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControlelr = void 0;
const auth_service_1 = require("./auth.service");
const setCookies_1 = require("../../utills/setCookies");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInfo = yield auth_service_1.authService.loginUser(req.body);
        (0, setCookies_1.setAuthCookie)(res, loginInfo);
        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: loginInfo
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.authControlelr = {
    loginUser
};
