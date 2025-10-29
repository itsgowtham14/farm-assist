import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import metadataRouter from './routes/metadata.js';
import selectionsRouter from './routes/selections.js';
import timelineRouter from './routes/timeline.js';
import issuesRouter from './routes/issues.js';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import issueTemplatesRouter from './routes/issueTemplates.js';
import notesRouter from './routes/notes.js';
import aiSolutionRouter from './routes/aiSolution.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory (server folder)
dotenv.config({ path: join(__dirname, '..', '.env') });

// Use default values if environment variables are not set
const JWT_SECRET = process.env.JWT_SECRET || 'farmassist_default_secret_key_change_in_production';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmassist';

console.log('Environment check:');
console.log('- HUGGINGFACE_API_KEY:', process.env.HUGGINGFACE_API_KEY ? 'Loaded ✓' : 'Using fallback solutions');
console.log('- JWT_SECRET:', JWT_SECRET ? 'Loaded ✓' : 'NOT FOUND ✗');
console.log('- MONGO_URI:', MONGO_URI ? 'Loaded ✓' : 'NOT FOUND ✗');

// Make JWT_SECRET available globally for other modules
process.env.JWT_SECRET = JWT_SECRET;

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-vercel-app.vercel.app']
    : '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/metadata', metadataRouter);
app.use('/api/products', productsRouter);
app.use('/api/selections', selectionsRouter);
app.use('/api/timeline', timelineRouter);
app.use('/api/issues', issuesRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/issue-templates', issueTemplatesRouter);
app.use('/api/notes', notesRouter);
app.use('/api/ai-solution', aiSolutionRouter);

app.get('/', (req, res) => res.json({ msg: 'FarmAssist backend running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Export for Vercel serverless
export default app;
