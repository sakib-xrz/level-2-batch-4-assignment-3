import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import BlogValidation from './blog.validation';
import BlogController from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(BlogController.GetBlogs)
  .post(
    auth('user'),
    validateRequest(BlogValidation.CreateShecma),
    BlogController.CreateBlog,
  );

router.get('/me', auth('user'), BlogController.GetMyBlogs);

router
  .route('/:id')
  .patch(
    auth('user'),
    validateRequest(BlogValidation.UpdateShecma),
    BlogController.UpdateBlog,
  )
  .delete(auth('user'), BlogController.DeleteBlog);

export const BlogRoutes = router;
