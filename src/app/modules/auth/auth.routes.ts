import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthValidation from './auth.validation';
import AuthController from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.LoginSchema),
  AuthController.UserLogin,
);

router.post(
  '/register',
  validateRequest(AuthValidation.RegisterSchema),
  AuthController.UserRegister,
);

export const AuthRoutes = router;
