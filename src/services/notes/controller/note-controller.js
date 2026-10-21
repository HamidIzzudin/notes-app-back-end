import NoteRepositories from '../repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

// Buat instance dari NoteRepositories
const noteRepositories = new NoteRepositories();

export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.validated;
  const note = await noteRepositories.createNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  // Format data noteId sesuai kebutuhan Postman test
  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
};

// Ubah nama dari getNotes menjadi getAllNotes
export const getAllNotes = async (req, res) => {
  const notes = await noteRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', { notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await noteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  // Format data { note } sesuai kebutuhan Postman test
  return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;

  const note = await noteRepositories.editNote({
    id,
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await noteRepositories.deleteNote(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus');
};
