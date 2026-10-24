import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsersByUsername,
} from '../controller/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../validator/schema.js';

const router = Router();

router.post('/users', validate(userPayloadSchema), createUser);
router.get('/users', getUsersByUsername);
router.get('/users/:id', getUserById);

export default router;