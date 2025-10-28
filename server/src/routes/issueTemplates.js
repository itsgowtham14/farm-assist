import express from 'express';
import IssueTemplate from '../models/issueTemplate.js';

const router = express.Router();

// Get all issue templates
router.get('/', async (req, res) => {
  try {
    const templates = await IssueTemplate.find().sort({ issueType: 1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issue templates' });
  }
});

// Admin: create new issue template
router.post('/', async (req, res) => {
  try {
    const { issueType, description, solution, weeklySolutions } = req.body;
    const template = new IssueTemplate({ issueType, description, solution, weeklySolutions });
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create issue template' });
  }
});

// Admin: update issue template
router.put('/:id', async (req, res) => {
  try {
    const { description, solution, weeklySolutions } = req.body;
    const updated = await IssueTemplate.findByIdAndUpdate(req.params.id, { description, solution, weeklySolutions }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update issue template' });
  }
});

// Admin: delete issue template
router.delete('/:id', async (req, res) => {
  try {
    await IssueTemplate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete issue template' });
  }
});

export default router;
