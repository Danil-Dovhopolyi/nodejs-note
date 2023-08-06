import { Note } from '../entities/Note.js';
import { Stats } from './Stats.js';

export interface INoteService {
  getNote(id: number): Note | null;
  getStats(): Stats;
  getAllNotes(): Note[];
  createNote(note: Partial<Note>): Note;
  updateNote(id: number, note: Partial<Note>): Note | null;
  deleteNote(id: number): void;
}
