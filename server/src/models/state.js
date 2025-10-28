import mongoose from 'mongoose';

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String }
}, { timestamps: true });

export default mongoose.model('State', StateSchema);
