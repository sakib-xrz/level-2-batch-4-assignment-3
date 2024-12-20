import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';

const BlockUser = async (targatedUserId: string, user: JwtPayload) => {
  const targatedUser = await User.findById(targatedUserId);

  if (!targatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (targatedUser._id.toString() === user._id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You can not block yourself');
  }

  await User.findByIdAndUpdate(targatedUserId, { isBlocked: true });
};

const AdminService = { BlockUser };

export default AdminService;
