import { Note } from '../entities/Note.js';
import { NoteData } from '../models/NoteData.js';

const notes: Note[] = [
  {
    id: 1,
    createdAt: new Date('2023-07-29T08:00:00'),
    category: 'Idea',
    content: 'This is the content of Note 1',
    activeNote: true,
    archived: false,
    dates: '3/5/2021, 5/5/2021',
  },
  {
    id: 2,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021 ',
    category: 'Task',
    activeNote: false,
    archived: true,
    dates: '3/5/2021, 5/5/2021',
  },
  {
    id: 3,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "Second note. Today's date.",
    category: 'Idea',
    activeNote: true,
    archived: false,
    dates: '2023-08-03',
  },
  {
    id: 4,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "Third note. Today's date.",
    category: 'Task',
    activeNote: true,
    archived: false,
    dates: '2023-08-04',
  },
  {
    id: 5,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "Four note. Today's date.",
    category: 'Task',
    activeNote: true,
    archived: false,
    dates: '2023-08-05',
  },
];

let currentId = notes.length + 1;

export const create = (noteData: NoteData): Note => {
  const newNote: Note = {
    id: currentId++,
    ...noteData,
    activeNote: true,
    archived: false,
    createdAt: new Date(),
    dates: '',
  };
  notes.push(newNote);
  return newNote;
};

const deleteNote = (id: number): Note | undefined => {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    const deletedNote = notes.splice(index, 1)[0];
    return deletedNote;
  }
  return undefined;
};

const edit = (id: number, updatedNoteData: NoteData): Note | undefined => {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    const updatedNote: Note = {
      ...notes[index],
      ...updatedNoteData,
    };
    notes[index] = updatedNote;
    return updatedNote;
  }
  return undefined;
};

const get = (id: number): Note | undefined => {
  return notes.find((note) => note.id === id);
};

const getAll = (): Note[] => {
  return notes;
};

const notesRepository = {
  create,
  delete: deleteNote,
  edit,
  get,
  getAll,
};

export default notesRepository;
