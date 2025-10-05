"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserToken = void 0;
const jwt_1 = require("./jwt");
const createUserToken = (user) => {
    const jwtPayload = {
        userId: user.id,
        useremail: user.email,
        userRole: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, process.env.JWT_REFRESH_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserToken = createUserToken;
// export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
//     const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload
//     const isExistUser = await User.findOne({ email: verifiedRefreshToken.email })
//     if (!isExistUser) {
//         throw new AppError(httpStatus.NOT_FOUND, "Usre not found")
//     }
//     console.log("from user token in the utills....",isExistUser)
//     if (isExistUser.isActive === UserStatus.BLOCKED || isExistUser.isActive === UserStatus.INACTIVE) {
//         throw new AppError(httpStatus.BAD_REQUEST, `User is ${isExistUser.isActive}`)
//     }
//     // if (isExistUser.isDeleted) {
//     //     throw new AppError(httpStatus.BAD_REQUEST, `User is deleted`)
//     // }
//     const jwtPayload = {
//         userId: isExistUser._id,
//         email: isExistUser.email,
//         userRole: isExistUser.role
//     }
//     const userAccessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRATION)
//     return userAccessToken
// }
