import mongoose from 'mongoose';
import { BlogInterface } from './blog.interface';

const BlogSchema = new mongoose.Schema<BlogInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  },
);

export const Blog = mongoose.model<BlogInterface>('Blog', BlogSchema);
