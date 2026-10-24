import CollaborationRepositories from '../repositories/collaboration-repositories.js';
import NoteRepositories from '../../notes/repositories/note-repositories.js';
import UserRepositories from '../../users/repositories/user-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import AuthorizationError from '../../../exceptions/authorization-error.js';

export const addCollaboration = async (req, res, next) => {
  const { id: credentialId } = req.user;
  const { noteId, userId } = req.validated;

  const note = await NoteRepositories.getNoteById(noteId);
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  const isOwner = await NoteRepositories.verifyNoteOwner(noteId, credentialId);
  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const user = await UserRepositories.getUserById(userId);
  if (!user) {
    return next(new NotFoundError('User tidak ditemukan'));
  }

  const collaborationId = await CollaborationRepositories.addCollaboration(noteId, userId);
  if (!collaborationId) {
    return next(new InvariantError('Kolaborasi gagal ditambahkan'));
  }

  return response(res, 201, 'Kolaborasi berhasil ditambahkan', { collaborationId });
};

export const deleteCollaboration = async (req, res, next) => {
  const { noteId, userId } = req.validated;
  const { id: credentialId } = req.user;

  const note = await NoteRepositories.getNoteById(noteId);
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  const isOwner = await NoteRepositories.verifyNoteOwner(noteId, credentialId);
  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  await CollaborationRepositories.deleteCollaboration(noteId, userId);

  return response(res, 200, 'Kolaborasi berhasil dihapus');
};