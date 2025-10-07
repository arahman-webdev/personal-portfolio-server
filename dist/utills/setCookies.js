"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
    }
};
exports.setAuthCookie = setAuthCookie;
// maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
