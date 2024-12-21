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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const blog_model_1 = require("../blog/blog.model");
const BlockUser = (targatedUserId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const targatedUser = yield user_model_1.User.findById(targatedUserId);
    if (!targatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (targatedUser._id.toString() === user._id.toString()) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You can not block yourself');
    }
    yield user_model_1.User.findByIdAndUpdate(targatedUserId, { isBlocked: true });
});
const DeleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findByIdAndDelete(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
});
const AdminService = { BlockUser, DeleteBlog };
exports.default = AdminService;
