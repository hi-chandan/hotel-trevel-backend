"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRes = void 0;
class HttpRes {
    constructor(data, message, status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
    static isHttpRes(obj) {
        return obj instanceof HttpRes;
    }
    static ok(data, message) {
        return new HttpRes(data, message, 200);
    }
    static create(data, message) {
        return new HttpRes(data, message, 201);
    }
}
exports.HttpRes = HttpRes;
