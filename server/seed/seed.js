import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import State from '../src/models/state.js';
import Crop from '../src/models/crop.js';
import Product from '../src/models/product.js';
import TimelineTask from '../src/models/timelineTask.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmassist';

async function runSeed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to Mongo for seeding');

  const dataPath = path.join(process.cwd(), 'server', 'seed', 'seedData.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(raw);

  // Clear collections
  await State.deleteMany({});
  await Crop.deleteMany({});
  await Product.deleteMany({});
  await TimelineTask.deleteMany({});

  // Insert states
  const stateDocs = [];
  for (const s of data.states) {
    const sd = new State(s);
    await sd.save();
    stateDocs.push(sd);
  }

  // Insert crops
  const cropDocs = [];
  for (const c of data.crops) {
    const allowedStates = stateDocs.filter(s => c.allowedStateNames.includes(s.name)).map(s => s._id);
    const cd = new Crop({ name: c.name, seasons: c.seasons, allowedStates, description: c.description });
    await cd.save();
    cropDocs.push(cd);
  }

  // Insert products
  const productDocs = [];
  for (const p of data.products) {
    const pd = new Product(p);
    await pd.save();
    productDocs.push(pd);
  }

  // Insert timeline tasks
  for (const t of data.timelineTasks) {
    const crop = cropDocs.find(c => c.name === t.cropName);
    if (!crop) continue;
    const tt = new TimelineTask({ crop: crop._id, season: t.season, week: t.week, task: t.task, description: t.description });
    await tt.save();
  }

  console.log('Seeding complete');
  process.exit(0);
}

runSeed().catch(err => { console.error(err); process.exit(1); });
