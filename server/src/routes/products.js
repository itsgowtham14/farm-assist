import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.json(products);
});

router.post('/', async (req, res) => {
  const body = req.body;
  try {
    const p = new Product(body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create product' });
  }
});

export default router;
