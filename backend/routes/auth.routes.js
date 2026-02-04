import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/google-login', authController.googleLogin);

export default router;
