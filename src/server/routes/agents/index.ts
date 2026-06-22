import { Router } from 'express';
import formsRouter from './forms';
import leadsRouter from './leads';

const router = Router();

router.use(formsRouter);
router.use(leadsRouter);

export default router;
