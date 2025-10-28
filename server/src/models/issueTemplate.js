import mongoose from 'mongoose';

const IssueTemplateSchema = new mongoose.Schema({
  issueType: { type: String, required: true, unique: true },
  description: { type: String },
  // general default solution
  solution: { type: String },
  // optional per-week solutions array: [{ week: Number, solution: String }]
  weeklySolutions: [{
    week: { type: Number, required: true },
    solution: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model('IssueTemplate', IssueTemplateSchema);
