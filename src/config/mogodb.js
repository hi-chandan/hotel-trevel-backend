"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.DBconnect = mongoose_1.default
    .connect("mongodb://localhost:27017/", {
    dbName: "authuser",
})
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database Error", err));
