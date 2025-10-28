import express from 'express';
import State from '../models/state.js';
import Crop from '../models/crop.js';

const router = express.Router();

router.get('/states', async (req, res) => {
  const states = await State.find().sort({ name: 1 });
  res.json(states);
});

// seasons list (static)
router.get('/seasons', (req, res) => {
  res.json(['Kharif', 'Rabi', 'Zaid']);
});

// GET crops, optional filters by state and season
router.get('/crops', async (req, res) => {
  const { state, season } = req.query;
  try {
    let query = {};
    
    if (state) {
      // First find the state by name to get its ID
      const stateDoc = await State.findOne({ name: state });
      if (!stateDoc) {
        return res.status(404).json({ error: `State '${state}' not found` });
      }
      query.allowedStates = stateDoc._id;
    }
    
    if (season) {
      query.seasons = season;
    }

    const crops = await Crop.find(query)
      .populate('allowedStates', 'name')  // Populate state names
      .sort({ name: 1 });

    // Map the results to include state names instead of IDs
    const mappedCrops = crops.map(crop => ({
      _id: crop._id,
      name: crop.name,
      seasons: crop.seasons,
      description: crop.description,
      allowedStates: crop.allowedStates.map(state => state.name)
    }));

    res.json(mappedCrops);
  } catch (err) {
    console.error('Error fetching crops:', err);
    res.status(500).json({ error: 'Failed to load crops' });
  }
});

export default router;
