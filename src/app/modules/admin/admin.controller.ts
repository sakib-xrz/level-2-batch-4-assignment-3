import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AdminService from './admin.services';

const BlockUser = catchAsync(async (req, res) => {
  const targatedUserId = req.params.userId;
  const user = req.user;

  await AdminService.BlockUser(targatedUserId, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User blocked successfully',
  });
});

const AdminController = { BlockUser };

export default AdminController;
