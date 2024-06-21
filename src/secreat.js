"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUD_NAME = exports.API_ID = exports.API_SECRET = exports.JWT_SECRET = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.API_SECRET = process.env.API_SECRET;
exports.API_ID = process.env.API_ID;
exports.CLOUD_NAME = process.env.CLOUD_NAME;
