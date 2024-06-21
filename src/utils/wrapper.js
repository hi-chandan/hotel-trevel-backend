"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapper = void 0;
const httpres_1 = require("./httpres");
const wrapper = (func) => {
    return (req, res, next) => {
        try {
            const result = func(req, res, next);
            if (result instanceof Promise) {
                result
                    .then((val) => {
                    if (httpres_1.HttpRes.isHttpRes(val)) {
                        res.status(val.status).json(val);
                    }
                    else if (val && val !== res) {
                        res.send(val);
                    }
                })
                    .catch(next);
            }
        }
        catch (error) {
            next(error);
        }
    };
};
exports.wrapper = wrapper;
// function handleResult(result: any, res: any): void {
//   if (HttpRes.isHttpRes(result)) {
//     res.status(result.status).json(result);
//   } else if (result && result !== res) res.send(result);
// }
