import mongoose from 'mongoose';

const TimelineTaskSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  season: { type: String, required: true },
  week: { type: Number, required: true },
  task: { type: String, required: true },
  description: { type: String },
  recommendedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

export default mongoose.model('TimelineTask', TimelineTaskSchema);
