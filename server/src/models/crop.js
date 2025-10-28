import mongoose from 'mongoose';

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seasons: [{ type: String }],
  allowedStates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }],
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Crop', CropSchema);
