import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  selection: { type: mongoose.Schema.Types.ObjectId, ref: 'Selection', required: true },
  week: { type: Number, required: true },
  note: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Note', NoteSchema);
