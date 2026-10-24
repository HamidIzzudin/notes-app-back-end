import { Router } from 'express';
import {
  addCollaboration,
  deleteCollaboration,
} from '../controller/collaboration-controller.js';
import validate from '../../../middlewares/validate.js';
import {
  collaborationPayloadSchema,
  collaborationDeletePayloadSchema,
} from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.use(authenticateToken);

router.post('/collaborations', validate(collaborationPayloadSchema), addCollaboration);
router.delete('/collaborations', validate(collaborationDeletePayloadSchema), deleteCollaboration);

export default router;