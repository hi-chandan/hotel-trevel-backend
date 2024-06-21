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
exports.savePost = exports.SavePost = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const httperrors_1 = require("../utils/httperrors");
class SavePost {
    constructor(saveModel) {
        this.saveModel = saveModel;
    }
    savePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                userId,
                postId,
            };
            const exist = yield this.saveModel.findMany({
                where: { userId: userId, postId: postId },
            });
            if (exist.length == 1) {
                throw new httperrors_1.BadRequest("Post is already saved", 400);
            }
            const savePost = yield this.saveModel.create({ data });
            return savePost;
        });
    }
    deleteSavePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.saveModel.findUnique({
                where: { userId: userId, id: postId },
            });
            if (!check) {
                throw new httperrors_1.BadRequest("SavePost not found", 400);
            }
            const deletePost = yield this.saveModel.delete({
                where: { id: postId, userId: userId },
            });
            if (!deletePost) {
                throw new httperrors_1.BadRequest("Can't delete the save post", 400);
            }
            return deletePost;
        });
    }
    getSavePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPosts = yield this.saveModel.findMany({
                where: { userId: userId },
                include: {
                    post: true,
                },
            });
            return getPosts;
        });
    }
    getListSave(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkSave = yield this.saveModel.findMany({
                where: { userId: userId },
            });
            if (checkSave.length === 0) {
                throw new httperrors_1.BadRequest("No Save Yet", 400);
            }
            return checkSave;
        });
    }
    getSavePostById(saveId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.saveModel.findUnique({ where: { id: saveId } });
            if (!post) {
                throw new httperrors_1.BadRequest("No such Save", 400);
            }
            return post;
        });
    }
}
exports.SavePost = SavePost;
exports.savePost = new SavePost(prisma_1.default.savepost);
