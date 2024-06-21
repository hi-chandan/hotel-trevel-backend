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
const express_1 = __importDefault(require("express"));
const errorhandler_1 = require("./middleware/errorhandler");
const user_route_1 = __importDefault(require("./router/user.route"));
const prisma_1 = __importDefault(require("./config/prisma"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const post_route_1 = __importDefault(require("./router/post.route"));
const save_post_router_1 = __importDefault(require("./router/save.post.router"));
const cloudnary_1 = require("./config/cloudnary");
const cors_1 = __importDefault(require("cors"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cors_1.default)({
            origin: "https://travel-and-stay-booking-app.vercel.app",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        }));
        prisma_1.default.$connect();
        (0, cloudnary_1.cloud)();
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use("/api", user_route_1.default, post_route_1.default, save_post_router_1.default);
        app.use(errorhandler_1.errorhandler);
        app.listen(3000, () => {
            console.log("Server is working");
        });
    });
}
main();
