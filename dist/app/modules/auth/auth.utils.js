"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn,
    });
};
const AuthUtils = { CreateToken };
exports.default = AuthUtils;
