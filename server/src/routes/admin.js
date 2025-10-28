import express from 'express';
import State from '../models/state.js';
import Crop from '../models/crop.js';
import TimelineTask from '../models/timelineTask.js';
import Product from '../models/product.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin
router.use(isAdmin);

// States CRUD
router.get('/states', async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/states', async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json(state);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/states/:id', async (req, res) => {
  try {
    await State.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crops CRUD
router.get('/crops', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/crops', async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/crops/:id', async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Timeline Tasks CRUD
router.get('/timelineTasks', async (req, res) => {
  try {
    const tasks = await TimelineTask.find()
      .populate('crop')
      .sort({ crop: 1, week: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/timelineTasks', async (req, res) => {
  try {
    const task = new TimelineTask(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/timelineTasks/:id', async (req, res) => {
  try {
    await TimelineTask.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Products CRUD
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;