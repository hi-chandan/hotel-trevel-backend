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
exports.userControl = void 0;
const httpres_1 = require("../utils/httpres");
const auth_service_1 = require("../service/auth.service");
const token_service_1 = require("../service/token.service");
class UserControl {
    constructor(userService) {
        this.userService = userService;
    }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const user = yield this.userService.Signup(data);
            (0, token_service_1.tokenservice)(user, res);
            return httpres_1.HttpRes.ok(user, "user is Register");
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield this.userService.login(data);
            (0, token_service_1.tokenservice)(user, res);
            return httpres_1.HttpRes.ok(user, "login successful");
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.logout(res);
            return "logout success";
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            return httpres_1.HttpRes.ok(user, "user information");
        });
    }
}
exports.userControl = new UserControl(auth_service_1.userService);
