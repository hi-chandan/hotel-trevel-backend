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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const httperrors_1 = require("../utils/httperrors");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    Signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const existing = yield this.userModel.findUnique({ where: { email } });
            if (existing) {
                throw new httperrors_1.BadRequest("user is already registed", 400);
            }
            const hashPassword = yield bcrypt_1.default.hashSync(password, 10);
            data.password = hashPassword;
            const user = yield this.userModel.create({ data });
            if (!user) {
                throw new httperrors_1.BadRequest("user not created", 400);
            }
            return user;
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield this.userModel.findUnique({ where: { email } });
            if (!user) {
                throw new httperrors_1.BadRequest("User is not Register", 400);
            }
            const Match = yield bcrypt_1.default.compare(password, user.password);
            if (!Match) {
                throw new httperrors_1.BadRequest("Invalid user", 400);
            }
            return user;
        });
    }
    logout(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
        });
    }
    me(data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.UserService = UserService;
exports.userService = new UserService(prisma_1.default.user);
