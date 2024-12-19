import { Router, RequestHandler } from 'express';
import { check } from 'express-validator';

import { createUser, loginUser, revalidateToken } from '../controllers/auth';
import { validateFields } from '../middlewares/validateFields';
import { validateToken } from '../middlewares/validateToken';

const router = Router();

router.post(
  '/new',
  [
    // * middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'The password is required and must be at least 6 characters long').isLength({
      min: 6,
    }),
    validateFields as RequestHandler,
  ],
  createUser as RequestHandler
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'The password is required and must be at least 6 characters long').isLength({
      min: 6,
    }),
    validateFields as RequestHandler,
  ],
  loginUser as RequestHandler
);

router.get('/renew', validateToken as RequestHandler, revalidateToken);

export default router;
