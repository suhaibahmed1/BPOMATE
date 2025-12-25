import express from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
// Usually registration is restricted or internal, but exposing for setup/demo
router.post('/register', validate(registerSchema), authController.register);

export default router;