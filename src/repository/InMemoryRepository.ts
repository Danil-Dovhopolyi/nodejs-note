import { Note } from '../entities/Note.js';
import { INoteRepository } from '../models/INoteRepository.js';
import { Stats } from '../models/Stats.js';

export class InMemoryNoteRepository implements INoteRepository {
  private mockedNotes: Note[] = [
    {
      id: 1,
      createdAt: new Date('2023-07-29T08:00:00'),
      content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021 ',
      category: 'Task',
      activeNote: true,
      archived: false,
      dates: '3/5/2021, 5/5/2021',
    },
    {
      id: 2,
      createdAt: new Date('2023-07-29T08:00:00'),
      content: "Second note. Today's date.",
      category: 'Idea',
      activeNote: true,
      archived: false,
      dates: '2023-08-03',
    },
    {
      id: 3,
      createdAt: new Date('2023-07-29T08:00:00'),
      content: "Third note. Today's date.",
      category: 'Task',
      activeNote: true,
      archived: false,
      dates: '2023-08-04',
    },
    {
      id: 4,
      createdAt: new Date('2023-07-29T08:00:00'),
      content: "Four note. Today's date.",
      category: 'Task',
      activeNote: true,
      archived: false,
      dates: '2023-08-05',
    },
  ];

  getById(id: number): Note | null {
    return this.mockedNotes.find((note) => note.id === id) || null;
  }

  getAll(): Note[] {
    return this.mockedNotes;
  }

  save(note: Note): Note {
    const newNote = { ...note };
    newNote.id = this.mockedNotes.length + 1;
    this.mockedNotes.push(newNote);
    return newNote;
  }
  getStats(): Stats {
    const allNotes = this.mockedNotes;
    const totalNotes = allNotes.length;
    const totalArchived = allNotes.filter((note) => note.archived).length;

    return { totalNotes, totalArchived };
  }

  update(note: Note): Note | null {
    const index = this.mockedNotes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.mockedNotes[index] = { ...note };
      return this.mockedNotes[index];
    }
    return null;
  }

  remove(id: number): void {
    this.mockedNotes = this.mockedNotes.filter((note) => note.id !== id);
  }
}
