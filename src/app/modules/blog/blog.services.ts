import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { BlogInterface } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

const GetBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: '-role -isBlocked',
    }),
    query,
  )
    .search(['title', 'content'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;
  return result;
};

const GetMyBlogs = async (author: string) => {
  const result = await Blog.find({ author }).populate({
    path: 'author',
    select: '-role -isBlocked',
  });

  return result;
};

const CreateBlog = async (author: string, payload: BlogInterface) => {
  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const result = (await Blog.create({ ...payload, author })).populate({
    path: 'author',
    select: '-role -isBlocked',
  });

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

const DeleteBlog = async (id: string, author: string) => {
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
      "You can't delete other's blog",
    );
  }

  await Blog.findByIdAndDelete(id);
};

const BlogService = {
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
  GetBlogs,
  GetMyBlogs,
};

export default BlogService;
