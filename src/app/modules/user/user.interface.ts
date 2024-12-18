import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked?: boolean;
}

export interface UserModel extends Model<UserInterface> {
  isUserExists(email: string): Promise<UserInterface | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
