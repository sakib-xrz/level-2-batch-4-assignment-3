import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.services';

const UserLogin = catchAsync(async (req, res) => {
  const result = await AuthService.UserLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfull',
    data: result,
  });
});

const AuthController = { UserLogin };

export default AuthController;
