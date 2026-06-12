import { Router } from 'express';
import loginRouter from './login';
import signupRouter from './signup';

const router = Router();

router.use(loginRouter);
router.use(signupRouter);

export default router;
