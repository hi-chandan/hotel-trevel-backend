"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const secreat_1 = require("../secreat");
const cloud = () => {
    return cloudinary_1.default.v2.config({
        cloud_name: secreat_1.CLOUD_NAME,
        api_key: secreat_1.API_ID,
        api_secret: secreat_1.API_SECRET,
    });
};
exports.cloud = cloud;
