import { Request, Response } from 'express';
import { NoteData } from '../models/NoteData.js';
import { Stats } from '../models/Stats.js';
import notesRepository from '../repository/notes.repository.js';

export const createNote = (req: Request, res: Response) => {
  const newNote: NoteData = req.body;
  const createdNote = notesRepository.create(newNote);
  res.status(201).json(createdNote);
};

export const deleteNote = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deletedNote = notesRepository.delete(id);
  if (deletedNote) {
    res.status(200).json(deletedNote);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
};

export const editNote = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedNoteData: NoteData = req.body;
  const updatedNote = notesRepository.edit(id, updatedNoteData);
  if (updatedNote) {
    res.status(200).json(updatedNote);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
};

export const getNote = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const note = notesRepository.get(id);
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
};

export const getNotes = (_req: Request, res: Response) => {
  const notes = notesRepository.getAll();
  res.status(200).json(notes);
};

export const getStats = (_req: Request, res: Response) => {
  const allNotes = notesRepository.getAll();
  const totalNotes = allNotes.length;
  const totalArchived = allNotes.filter((note) => note.archived).length;

  const stats: Stats = {
    totalNotes,
    totalArchived,
  };

  res.status(200).json(stats);
};
