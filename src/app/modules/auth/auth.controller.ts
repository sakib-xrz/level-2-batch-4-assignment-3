import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.services';

const UserLogin = catchAsync(async (req, res) => {
  const result = await AuthService.UserLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successful',
    data: result,
  });
});

const UserRegister = catchAsync(async (req, res) => {
  const result = await AuthService.UserRegister(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const AuthController = { UserLogin, UserRegister };

export default AuthController;
