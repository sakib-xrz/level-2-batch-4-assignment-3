import express from 'express';
import auth from '../../middlewares/auth';
import AdminController from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), AdminController.BlockUser);

export const AdminRoutes = router;
