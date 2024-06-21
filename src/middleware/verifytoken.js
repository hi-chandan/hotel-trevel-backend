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
exports.renewToken = exports.isAuth = void 0;
const httperrors_1 = require("../utils/httperrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const wrapper_1 = require("../utils/wrapper");
const httpres_1 = require("../utils/httpres");
exports.isAuth = (0, wrapper_1.wrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw new httperrors_1.AccessError("token invalid", 403);
    }
    const decode = (yield jsonwebtoken_1.default.verify(accessToken, "Thisistoken"));
    const user = yield prisma_1.default.user.findUnique({ where: { id: decode } });
    if (!user) {
        throw new httperrors_1.BadRequest("User Not match", 400);
    }
    req.user = user;
    next();
}));
const renewToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new httperrors_1.BadRequest("User must login In", 400);
    }
    const decode = (yield jsonwebtoken_1.default.verify(refreshToken, "Thisistoken"));
    const user = yield prisma_1.default.user.findUnique({ where: { email: decode } });
    if (!user) {
        throw new httperrors_1.BadRequest("No user is Valid", 400);
    }
    const accessToken = yield jsonwebtoken_1.default.sign(user.id, "Thisistoken");
    res.cookie("accessToken", accessToken, {
        maxAge: 300000,
        httpOnly: true,
    });
    return httpres_1.HttpRes.ok(accessToken, "token is generated");
});
exports.renewToken = renewToken;
