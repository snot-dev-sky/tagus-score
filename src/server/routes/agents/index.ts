import { Router } from 'express';
import formsRouter from './forms';

const router = Router();

router.use(formsRouter);

export default router;
