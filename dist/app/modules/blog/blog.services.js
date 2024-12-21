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
const blog_model_1 = require("./blog.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const GetBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('author'), query)
        .search(['title', 'content'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield blogQuery.modelQuery;
    return result;
});
const CreateBlog = (author, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAuthorExist = yield user_model_1.User.findById(author);
    if (!isAuthorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
    }
    const result = (yield blog_model_1.Blog.create(Object.assign(Object.assign({}, payload), { author }))).populate('author');
    return result;
});
const UpdateBlog = (id, author, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    const isAuthorExist = yield user_model_1.User.findById(author);
    if (!isAuthorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
    }
    const isAuthorBlog = blog.author.toString() === author.toString();
    if (!isAuthorBlog) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can't update other's blog");
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const DeleteBlog = (id, author) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    const isAuthorExist = yield user_model_1.User.findById(author);
    if (!isAuthorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Author not found');
    }
    const isAuthorBlog = blog.author.toString() === author.toString();
    if (!isAuthorBlog) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can't delete other's blog");
    }
    yield blog_model_1.Blog.findByIdAndDelete(id);
});
const BlogService = { CreateBlog, UpdateBlog, DeleteBlog, GetBlogs };
exports.default = BlogService;
