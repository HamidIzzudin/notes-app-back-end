import express from 'express';
import {
  createNote,
  getNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import { notePayloadSchema } from '../../../services/notes/validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/notes', validate(notePayloadSchema), createNote);
router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;