import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { BlogInterface } from './blog.interface';
import { Blog } from './blog.model';

const CreateBlog = async (author: string, payload: BlogInterface) => {
  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const result = (await Blog.create({ ...payload, author })).populate('author');

  return result;
};

const BlogService = { CreateBlog };

export default BlogService;
