import express, { Request, Response } from 'express';
import { INoteService } from '../models/INoteService.js';
import { validateCreateNote, validateEditNote } from '../helpers/validation.helper.js';

export class NoteController {
  private router = express.Router();

  constructor(private readonly noteService: INoteService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/notes', this.getAllNotes);
    this.router.get('/stats', this.getStats);
    this.router.get('/notes/:id', this.getNoteById);
    this.router.post('/notes', this.createNote);
    this.router.patch('/notes/:id', this.updateNote);
    this.router.delete('/notes/:id', this.deleteNote);
  }

  private getAllNotes = (_req: Request, res: Response): void => {
    const notes = this.noteService.getAllNotes();
    res.json(notes);
  };

  private getNoteById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    const note = this.noteService.getNote(id);
    if (!note) {
      res.sendStatus(404);
    } else {
      res.json(note);
    }
  };

  private getStats = (_req: Request, res: Response): void => {
    const stats = this.noteService.getStats();
    res.status(200).json(stats);
  };

  private createNote = [
    validateCreateNote,
    (req: Request, res: Response): void => {
      const { content, category, dates, activeNote, archived } = req.body;
      const newNote = this.noteService.createNote({
        content,
        category,
        dates,
        activeNote,
        archived,
      });
      res.json(newNote);
    },
  ];

  private updateNote = [
    validateEditNote,
    (req: Request, res: Response): void => {
      const id = parseInt(req.params.id, 10);
      const { content, category, dates, activeNote, archived } = req.body;
      const updatedNote = this.noteService.updateNote(id, {
        content,
        category,
        dates,
        activeNote,
        archived,
      });
      if (!updatedNote) {
        res.sendStatus(404);
      } else {
        res.json(updatedNote);
      }
    },
  ];

  private deleteNote = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    this.noteService.deleteNote(id);
    res.sendStatus(204);
  };

  public getRouter(): express.Router {
    return this.router;
  }
}
