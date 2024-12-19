import { Router, RequestHandler } from 'express';
import { createUser, loginUser, revalidateToken } from '../controllers/auth';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';

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
  createUser
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
  loginUser
);

router.get('/renew', revalidateToken);

export default router;
