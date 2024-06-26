"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { string } from "zod";
exports.userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
});
exports.User = mongoose_1.default.model("user", exports.userSchema);
