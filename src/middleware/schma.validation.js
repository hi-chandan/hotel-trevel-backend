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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const wrapper_1 = require("../utils/wrapper");
const validateFn = (schema, type) => (0, wrapper_1.wrapper)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (type !== "all") {
            req[type] = yield schema.parse(req[type]);
        }
        else {
            Object.assign(req, yield schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            }));
        }
        // call next
        next();
    }
    catch (error) {
        // zod error
        if (error instanceof zod_1.ZodError) {
            throw error;
        }
    }
}));
exports.validate = {
    // all validator
    all: (schema) => validateFn(schema, "all"),
    // only body validator
    body: (schema) => validateFn(schema, "body"),
    // only query validator
    query: (schema) => validateFn(schema, "query"),
    // only params validator
    params: (schema) => validateFn(schema, "params"),
};
