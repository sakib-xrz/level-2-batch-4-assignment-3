import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import BlogValidation from './blog.validation';
import BlogController from './blog.controller';

const router = express.Router();

router
  .route('/')
  .get(BlogController.GetBlogs)
  .post(
    validateRequest(BlogValidation.CreateShecma),
    BlogController.CreateBlog,
  );

router
  .route('/:id')
  .patch(
    validateRequest(BlogValidation.UpdateShecma),
    BlogController.UpdateBlog,
  )
  .delete(BlogController.DeleteBlog);

export const BlogRoutes = router;
