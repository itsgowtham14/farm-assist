import express from 'express';
import Selection from '../models/selection.js';
import auth from '../middleware/userAuth.js';

const router = express.Router();

// Get all selections for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const selections = await Selection.find({ userId: req.user.id, status: 'active' })
      .sort({ createdAt: -1 });
    res.json(selections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load selections' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    // Validate required fields
    const { state, crop, season, sowingDate, area } = req.body;
    
    if (!state || !crop || !season || !sowingDate || !area) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide state, crop, season, sowingDate, and area.' 
      });
    }

    // Create new selection
    const selection = new Selection({
      ...req.body,
      userId: req.user.id,
      area: parseFloat(area)
    });

    // Try to save and handle validation errors
    await selection.save();

    // Return the saved selection
    res.status(201).json(selection);
  } catch (err) {
    console.error('Error saving selection:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    // Handle other errors
    res.status(500).json({ error: 'Failed to save selection. Please try again.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sel = await Selection.findById(req.params.id).populate('state').populate('crop');
    if (!sel) return res.status(404).json({ error: 'Not found' });
    res.json(sel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load selection' });
  }
});

export default router;
