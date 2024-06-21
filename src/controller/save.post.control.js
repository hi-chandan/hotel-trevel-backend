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
exports.saveControl = exports.SaveControl = void 0;
const save_post_service_1 = require("../service/save.post.service");
const httpres_1 = require("../utils/httpres");
class SaveControl {
    constructor(saveService) {
        this.saveService = saveService;
    }
    savePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const postId = req.params.id;
            const savePost = yield this.saveService.savePost(userId, postId);
            return httpres_1.HttpRes.create(savePost, "post is saved");
        });
    }
    deleteSavePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const saveId = req.params.id;
            const deletePost = yield this.saveService.deleteSavePost(userId, saveId);
            return httpres_1.HttpRes.ok(deletePost, "removed Save");
        });
    }
    getSavePosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const getPosts = yield this.saveService.getSavePosts(userId);
            return httpres_1.HttpRes.ok(getPosts, "all User posts");
        });
    }
    getListSave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const getPosts = yield this.saveService.getListSave(userId);
            return httpres_1.HttpRes.ok(getPosts, "all User posts");
        });
    }
    getSavePostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveId = req.params.id;
            const post = yield this.saveService.getSavePostById(saveId);
            return httpres_1.HttpRes.ok(post, "User Save Post");
        });
    }
}
exports.SaveControl = SaveControl;
exports.saveControl = new SaveControl(save_post_service_1.savePost);
