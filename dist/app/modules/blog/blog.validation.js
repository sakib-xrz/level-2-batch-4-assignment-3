"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateShecma = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string',
        })
            .min(3, "Title can't be less than 3 characters")
            .max(255, "Title can't be more than 255 characters"),
        content: zod_1.z.string({
            required_error: 'Content is required',
            invalid_type_error: 'Content must be a string',
        }),
        isPublished: zod_1.z
            .boolean({
            invalid_type_error: 'isPublished must be a boolean',
        })
            .optional(),
    }),
});
const UpdateShecma = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            invalid_type_error: 'Title must be a string',
        })
            .min(3, "Title can't be less than 3 characters")
            .max(255, "Title can't be more than 255 characters")
            .optional(),
        content: zod_1.z
            .string({
            invalid_type_error: 'Content must be a string',
        })
            .optional(),
        isPublished: zod_1.z
            .boolean({
            invalid_type_error: 'isPublished must be a boolean',
        })
            .optional(),
    }),
});
const BlogValidation = {
    CreateShecma,
    UpdateShecma,
};
exports.default = BlogValidation;
