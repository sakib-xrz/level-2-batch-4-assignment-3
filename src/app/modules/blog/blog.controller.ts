import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BlogService from './blog.services';

const CreateBlog = catchAsync(async (req, res) => {
  const author = req.user._id;
  const result = await BlogService.CreateBlog(author, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Blog created successfully',
    data: result,
  });
});

const UpdateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user._id;
  const result = await BlogService.UpdateBlog(id, author, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

const BlogController = { CreateBlog, UpdateBlog };

export default BlogController;
