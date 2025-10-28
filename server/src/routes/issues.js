import express from 'express';
import Issue from '../models/issue.js';
import Selection from '../models/selection.js';
import IssueTemplate from '../models/issueTemplate.js';

const router = express.Router();

// Create issue report and return simple recommended adjustments
router.post('/', async (req, res) => {
  const body = req.body;
  try {
    // Basic validation
    const sel = await Selection.findById(body.selection);
    if (!sel) return res.status(404).json({ error: 'Selection not found' });
    // Try to use admin-defined issue template (case-insensitive match)
    const adjustments = {};
    try {
      const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^${escapeRegex(body.issueType || '')}$`, 'i');
      const tpl = await IssueTemplate.findOne({ issueType: regex });
      if (tpl) {
        // check weeklySolutions first
        const weekNum = Number(body.week);
        let weeklySol = null;
        if (Array.isArray(tpl.weeklySolutions)) {
          weeklySol = tpl.weeklySolutions.find(w => Number(w.week) === weekNum);
        }
        adjustments.note = (weeklySol && weeklySol.solution) ? weeklySol.solution : (tpl.solution || 'Reviewed by system - please follow recommended best practices.');
        adjustments.source = 'template';
      } else {
        // Fallback: Very simple rule-based adjustment logic (expandable)
        if (String(body.issueType).toLowerCase().includes('heavy') && String(body.issueType).toLowerCase().includes('rain')) {
          adjustments.note = 'Postpone fertilizer application by 2 weeks. Inspect field drainage.';
          adjustments.action = 'postpone_fertilizer';
          adjustments.delayWeeks = 2;
        } else if (String(body.issueType).toLowerCase().includes('pest')) {
          adjustments.note = 'Apply recommended pesticide for the crop. Check integrated pest management practices.';
          adjustments.action = 'apply_pesticide';
        } else if (String(body.issueType).toLowerCase().includes('drought')) {
          adjustments.note = 'Increase irrigation frequency and apply drought-tolerant measures.';
          adjustments.action = 'increase_irrigation';
        } else {
          adjustments.note = 'Reviewed by system - please follow recommended best practices.';
        }
      }
    } catch (tplErr) {
      console.error('Error looking up template:', tplErr);
      adjustments.note = 'Reviewed by system - please follow recommended best practices.';
    }

    const issue = new Issue({ ...body, recommendedAdjustments: adjustments });
    await issue.save();

    res.status(201).json({ issue, adjustments });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to submit issue' });
  }
});

export default router;

// Get all issues for a selection (placed after router initialization)
router.get('/', async (req, res) => {
  try {
    const { selection } = req.query;
    if (!selection) return res.status(400).json({ error: 'Selection id required' });
    const issues = await Issue.find({ selection }).sort({ week: 1, createdAt: 1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});
