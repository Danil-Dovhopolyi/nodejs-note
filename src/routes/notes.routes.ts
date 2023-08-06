import { Router } from 'express';
import { createNote, deleteNote, editNote, getNote, getNotes, getStats } from '../services/notes.service.js';
import { validateEditNote, validateCreateNote } from '../helpers/validation.helper.js';

const router = Router();

router.post('/', validateCreateNote, createNote);
router.get('/stats', getStats);
router.get('/:id', getNote);
router.get('/', getNotes);
router.patch('/:id', validateEditNote, editNote);
router.delete('/:id', deleteNote);

export default router;
