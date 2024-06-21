"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessError = exports.ConflictErrors = exports.BadRequest = exports.HttpErrors = void 0;
class HttpErrors extends Error {
    constructor(message = "Something Went Wrong", statusCode, errors) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.statusCode = statusCode;
    }
    get jsonData() {
        return [
            {
                message: this.message,
                statusCode: this.statusCode,
                errors: this.errors,
            },
        ];
    }
    static isHttpErrors(errors) {
        return errors instanceof HttpErrors;
    }
}
exports.HttpErrors = HttpErrors;
class BadRequest extends HttpErrors {
    constructor(message, errors) {
        super(message, 400, errors);
    }
}
exports.BadRequest = BadRequest;
class ConflictErrors extends HttpErrors {
    constructor(message, errors) {
        super(message, 400, errors);
    }
}
exports.ConflictErrors = ConflictErrors;
class AccessError extends HttpErrors {
    constructor(message, errors) {
        super(message, 403, errors);
    }
}
exports.AccessError = AccessError;
