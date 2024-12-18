import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({});

export const Blog = mongoose.model('Blog', BlogSchema);