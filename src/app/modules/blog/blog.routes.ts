import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import BlogValidation from './blog.validation';
import BlogController from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .post(
    auth('user'),
    validateRequest(BlogValidation.CreateShecma),
    BlogController.CreateBlog,
  );

export const BlogRoutes = router;
