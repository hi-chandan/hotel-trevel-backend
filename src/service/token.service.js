"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenservice = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenservice = (user, res) => {
    const accessToken = jsonwebtoken_1.default.sign(user.id, "Thisistoken");
    const refreshToken = jsonwebtoken_1.default.sign(user.email, "Thisistoken");
    res.cookie("accessToken", accessToken, {
        maxAge: 3000000,
        httpOnly: true,
        secure: true, // This should be true for cross-site cookies over HTTPS
        sameSite: "None",
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 6000000,
        httpOnly: true,
        secure: true, // This should be true for cross-site cookies over HTTPS
        sameSite: "None",
    });
};
exports.tokenservice = tokenservice;
