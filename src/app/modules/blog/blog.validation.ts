import { z } from 'zod';

const CreateShecma = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(3, "Title can't be less than 3 characters")
      .max(255, "Title can't be more than 255 characters"),
    content: z.string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    }),
    isPublished: z
      .boolean({
        invalid_type_error: 'isPublished must be a boolean',
      })
      .optional(),
  }),
});

const UpdateShecma = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .min(3, "Title can't be less than 3 characters")
      .max(255, "Title can't be more than 255 characters")
      .optional(),
    content: z
      .string({
        invalid_type_error: 'Content must be a string',
      })
      .optional(),
    isPublished: z
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

export default BlogValidation;
