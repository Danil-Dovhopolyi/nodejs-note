import { Note } from '../entities/Note.js';
import { INoteService } from '../models/INoteService.js';
import { INoteRepository } from '../models/INoteRepository.js';
import { Stats } from '../models/Stats.js';

let currentId = 1;
export class NoteService implements INoteService {
  constructor(private readonly noteRepository: INoteRepository) {}

  getNote(id: number): Note | null {
    return this.noteRepository.getById(id);
  }

  getAllNotes(): Note[] {
    return this.noteRepository.getAll();
  }

  createNote(noteData: Partial<Note>): Note {
    const newNote: Note = {
      id: currentId++,
      content: '',
      category: '',
      dates: '',
      activeNote: true,
      archived: false,
      createdAt: new Date(),
      ...noteData,
    };

    if (noteData.content && !noteData.dates) {
      const parsedDate = this.parseDateFromContent(noteData.content);
      if (parsedDate) {
        newNote.dates = parsedDate;
      }
    }

    return this.noteRepository.save(newNote);
  }

  updateNote(id: number, noteData: Partial<Note>): Note | null {
    const existingNote = this.noteRepository.getById(id);
    if (!existingNote) {
      return null;
    }

    const updatedNote: Note = {
      ...existingNote,
      ...noteData,
    };

    if (noteData.content && !noteData.dates) {
      const parsedDate = this.parseDateFromContent(noteData.content);
      if (parsedDate) {
        updatedNote.dates = parsedDate;
      }
    }

    this.noteRepository.update(updatedNote);

    return updatedNote;
  }
  getStats(): Stats {
    return this.noteRepository.getStats();
  }

  deleteNote(id: number): void {
    this.noteRepository.remove(id);
  }

  private parseDateFromContent(content: string): string | null {
    const dateRegex = /\[(\d{4}-\d{2}-\d{2})\]$/;
    const matches = content.match(dateRegex);
    if (matches && matches[1]) {
      return matches[1];
    }

    return null;
  }
}
