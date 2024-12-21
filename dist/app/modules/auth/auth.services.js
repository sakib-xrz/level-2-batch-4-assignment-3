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
const auth_utils_1 = __importDefault(require("./auth.utils"));
const config_1 = __importDefault(require("../../config"));
const UserLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No user found with this email');
    }
    const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User is blocked');
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_access_token_secret, config_1.default.jwt_access_token_expires_in);
    return { token };
});
const UserRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.isUserExists(payload.email);
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'User already exists');
    }
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { role: 'user' }));
    const result = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    return result;
});
const AuthService = { UserLogin, UserRegister };
exports.default = AuthService;
