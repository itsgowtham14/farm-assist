import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  selection: { type: mongoose.Schema.Types.ObjectId, ref: 'Selection', required: true },
  week: { type: Number, required: true },
  issueType: { type: String, required: true },
  details: { type: String },
  recommendedAdjustments: { type: Object },
  aiSolution: { type: String }
}, { timestamps: true });

export default mongoose.model('Issue', IssueSchema);
