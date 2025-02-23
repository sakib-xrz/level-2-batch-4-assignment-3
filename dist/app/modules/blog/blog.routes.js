"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = __importDefault(require("./blog.validation"));
const blog_controller_1 = __importDefault(require("./blog.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .get(blog_controller_1.default.GetBlogs)
    .post((0, validateRequest_1.default)(blog_validation_1.default.CreateShecma), blog_controller_1.default.CreateBlog);
router
    .route('/:id')
    .patch((0, validateRequest_1.default)(blog_validation_1.default.UpdateShecma), blog_controller_1.default.UpdateBlog)
    .delete(blog_controller_1.default.DeleteBlog);
exports.BlogRoutes = router;
