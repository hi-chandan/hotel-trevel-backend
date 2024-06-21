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
exports.postService = exports.PostService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const httperrors_1 = require("../utils/httperrors");
const cloudinary_1 = __importDefault(require("cloudinary"));
class PostService {
    constructor(postModel, saveModel, DetailModel) {
        this.postModel = postModel;
        this.saveModel = saveModel;
        this.DetailModel = DetailModel;
    }
    addPost(postData, postDetail, userId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.default.v2.uploader.upload(image, {
                folder: "check/estateApp",
            });
            postData.userId = userId;
            console.log("This is result", result);
            const post = yield this.postModel.create({
                data: Object.assign(Object.assign({}, postData), { image: {
                        publicId: result.public_id,
                        url: result.secure_url,
                    }, postDetail: {
                        create: postDetail,
                    } }),
            });
            console.log("This is post", post);
            return post;
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const singlePost = yield this.postModel.findUnique({
                where: { id: id },
                include: {
                    postDetail: true,
                    user: {
                        select: {
                            name: true,
                            avatar: true,
                        },
                    },
                },
            });
            if (!singlePost) {
                throw new httperrors_1.BadRequest("no specific post available", 400);
            }
            return singlePost;
        });
    }
    getPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPosts = yield prisma_1.default.post.findMany({
                where: {
                    title: query.search
                        ? {
                            contains: query.search,
                            mode: "insensitive",
                        }
                        : undefined,
                    city: query.city
                        ? {
                            contains: query.city,
                            mode: "insensitive",
                        }
                        : undefined,
                    type: query.type
                        ? {
                            equals: query.type,
                        }
                        : undefined,
                    price: {
                        gte: query.minPrice ? parseInt(query.minPrice) : undefined,
                        lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
                    },
                },
            });
            if (getPosts.length === 0) {
                throw new httperrors_1.BadRequest("zero Post", 400);
            }
            return getPosts;
        });
    }
    updatePost(body, userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.postModel.findUnique({
                where: { userId: userId, id: postId },
            });
            if (!check) {
                throw new httperrors_1.BadRequest("can't Change different post", 400);
            }
            const update = yield this.postModel.update({
                where: {
                    id: postId,
                },
                data: Object.assign({}, body),
            });
            return update;
        });
    }
    deletePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.postModel.findMany({
                where: { userId: userId, id: postId },
            });
            if (check.length == 0) {
                throw new httperrors_1.BadRequest("can't Delete different User post", 400);
            }
            console.log("This si check", check);
            yield this.DetailModel.deleteMany({ where: { postId: postId } });
            const saveDelete = yield this.saveModel.deleteMany({
                where: { postId: postId },
            });
            const deletePost = yield this.postModel.delete({ where: { id: postId } });
            return deletePost;
        });
    }
    userPost(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPost = yield this.postModel.findMany({
                where: { userId: userId },
            });
            return userPost;
        });
    }
}
exports.PostService = PostService;
exports.postService = new PostService(prisma_1.default.post, prisma_1.default.savepost, prisma_1.default.postDetail);
