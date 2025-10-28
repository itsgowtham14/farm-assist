import express from 'express';
import TimelineTask from '../models/timelineTask.js';
import Crop from '../models/crop.js';

const router = express.Router();

// Get timeline for crop by name
router.get('/:cropName', async (req, res) => {
  const { cropName } = req.params;
  const { season, sowingDate } = req.query;
  try {
    const crop = await Crop.findOne({ name: cropName });
    if (!crop) return res.status(404).json({ error: 'Crop not found' });
    
    const tasks = await TimelineTask.find({ crop: crop._id, season }).sort({ week: 1 }).populate('recommendedProducts');

    let timeline = tasks.map(t => ({ week: t.week, task: t.task, description: t.description, recommendedProducts: t.recommendedProducts }));

    if (sowingDate) {
      // compute approximate date for each week
      const sow = new Date(sowingDate);
      timeline = timeline.map(t => ({ ...t, startDate: new Date(sow.getTime() + (t.week - 1) * 7 * 24 * 60 * 60 * 1000) }));
    }

    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load timeline' });
  }
});

export default router;
