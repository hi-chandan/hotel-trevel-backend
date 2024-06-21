"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandler = void 0;
const httperrors_1 = require("../utils/httperrors");
const zod_1 = require("zod");
const errorhandler = (err, req, res, next) => {
    if (httperrors_1.HttpErrors.isHttpErrors(err)) {
        return res.status(err.statusCode).json({
            error: err.jsonData,
        });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(402).json({
            error: err.issues,
            errorObj: err.issues.reduce((acc, { message, path }) => {
                acc[path[0]] = message;
                return acc;
            }, {}),
        });
    }
    return res.json({
        error: {
            message: "Internal server Error",
            statusCode: 500,
            error: err,
        },
    });
};
exports.errorhandler = errorhandler;
