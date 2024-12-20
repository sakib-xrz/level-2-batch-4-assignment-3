import { Types } from 'mongoose';

export interface BlogInterface {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
}
