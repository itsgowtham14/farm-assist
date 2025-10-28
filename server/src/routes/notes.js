import express from 'express';
import Note from '../models/note.js';

const router = express.Router();

// Get notes for a selection
router.get('/:selectionId', async (req, res) => {
  try {
    const notes = await Note.find({ selection: req.params.selectionId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Add or update a note for a week
router.post('/', async (req, res) => {
  try {
    const { selection, week, note } = req.body;
    let n = await Note.findOneAndUpdate(
      { selection, week },
      { note },
      { new: true, upsert: true }
    );
    res.status(201).json(n);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save note' });
  }
});

export default router;
