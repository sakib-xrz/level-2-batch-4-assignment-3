import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export interface UserInterface {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
}

export interface UserModel extends Model<UserInterface> {
  isUserExists(id: string): Promise<UserInterface>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
