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

const BlogController = { CreateBlog };

export default BlogController;
