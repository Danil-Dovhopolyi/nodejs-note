import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { NoteController } from './controllers/NoteController.js';
import { InMemoryNoteRepository } from './repository/InMemoryRepository.js';
import { NoteService } from './services/NoteService.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const noteRepository = new InMemoryNoteRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

app.use('/api', noteController.getRouter());

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
