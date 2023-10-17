import { Note } from '../entities/Note.js';
import { Stats } from './Stats.js';

export interface INoteRepository {
  getById(id: number): Note | null;
  getStats(): Stats;
  getAll(): Note[];
  save(note: Note): Note;
  update(note: Note): Note | null;
  remove(id: number): void;
}
