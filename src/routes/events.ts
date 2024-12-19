import { RequestHandler, Router } from 'express';
import { check } from 'express-validator';

import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/events';
import { validateToken } from '../middlewares/validateToken';
import { validateFields } from '../middlewares/validateFields';
import { isDate } from '../helpers/isDate';

const router = Router();
router.use(validateToken as RequestHandler);

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields as RequestHandler,
  ],
  createEvent as RequestHandler
);

router.put('/:id', updateEvent as RequestHandler);

router.delete('/:id', deleteEvent as RequestHandler);

export default router;
