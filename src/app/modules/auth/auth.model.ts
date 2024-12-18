import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({});

export const Auth = mongoose.model('Auth', AuthSchema);