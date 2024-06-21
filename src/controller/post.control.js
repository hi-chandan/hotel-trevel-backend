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
exports.postControl = exports.PostControl = void 0;
const post_service_1 = require("../service/post.service");
const httpres_1 = require("../utils/httpres");
const post_schama_1 = require("../schema/post.schama");
class PostControl {
    constructor(postService) {
        this.postService = postService;
    }
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("This si file", req.file);
            const userId = req.user.id;
            const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            req.body.image = image;
            post_schama_1.imgInput.parse(req.body);
            console.log("This is image path", req.body);
            const postData = {
                title: req.body.title,
                price: req.body.price,
                address: req.body.address,
                city: req.body.city,
                bedroom: req.body.bedroom,
                bathroom: req.body.bathroom,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                type: req.body.type,
                property: req.body.property,
            };
            const postDetail = {
                desc: req.body.desc,
                utilities: req.body.utilities,
                pet: req.body.pet,
                size: req.body.size,
                income: req.body.income,
                bus: req.body.bus,
                restaurant: req.body.restaurant,
            };
            console.log("This is postDetails", postData);
            console.log("This is postDetails", postDetail);
            const post = yield this.postService.addPost(postData, postDetail, userId, image);
            return httpres_1.HttpRes.create(post, "post is created");
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const post = yield this.postService.getPost(id);
            return httpres_1.HttpRes.ok(post, "Your post");
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postService.getPosts(req.query);
            console.log("this is file", req.file);
            return httpres_1.HttpRes.ok(posts, "all posts");
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const data = req.body;
            const postId = req.params.id;
            const update = yield this.postService.updatePost(data, userId, postId);
            return httpres_1.HttpRes.ok(update, "update is complete");
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Wrokking properly", req.params.id);
            const userId = req.user.id;
            const postId = req.params.id;
            const deletePost = yield this.postService.deletePost(userId, postId);
            return httpres_1.HttpRes.ok(deletePost, "deleting is complete");
        });
    }
    userPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const userPost = yield this.postService.userPost(userId);
            return httpres_1.HttpRes.ok(userPost, "userProfile List post and Save Post");
        });
    }
}
exports.PostControl = PostControl;
exports.postControl = new PostControl(post_service_1.postService);
