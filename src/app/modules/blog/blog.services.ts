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

const UpdateBlog = async (
  id: string,
  author: string,
  payload: Partial<BlogInterface>,
) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blog.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You can't update other's blog",
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const BlogService = { CreateBlog, UpdateBlog };

export default BlogService;
