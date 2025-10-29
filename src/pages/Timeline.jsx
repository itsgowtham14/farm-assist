import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Timeline = ({ cropData, navigateTo }) => {
  let actualCropData = cropData;
  if (!actualCropData || !actualCropData.crop) {
    try {
      actualCropData = window.selectedCrop || JSON.parse(localStorage.getItem('current_crop'));
    } catch {}
  }

  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [notes, setNotes] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [issueTemplates, setIssueTemplates] = useState([]);
  const [selectedIssueType, setSelectedIssueType] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [issueSolution, setIssueSolution] = useState(null);
  const [weekIssues, setWeekIssues] = useState({});
  const [completedWeeks, setCompletedWeeks] = useState({});
  const [loadingAiSolution, setLoadingAiSolution] = useState({});
  const [aiSolutions, setAiSolutions] = useState({});

  useEffect(() => {
    if (actualCropData && actualCropData.crop && actualCropData._id) {
      fetchTimeline();
      fetchNotes();
      fetchIssueTemplates();
      fetchIssues();
      loadCompletedWeeks();
    }
  }, [actualCropData]);

  // Load completed weeks from localStorage
  const loadCompletedWeeks = () => {
    try {
      const key = `completed_weeks_${actualCropData._id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setCompletedWeeks(JSON.parse(saved));
      }
    } catch (err) {
      console.warn('Failed to load completed weeks:', err);
    }
  };

  // Mark week as done
  const handleMarkAsDone = (week) => {
    try {
      const key = `completed_weeks_${actualCropData._id}`;
      const updated = { ...completedWeeks, [week]: true };
      setCompletedWeeks(updated);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (err) {
      alert('Failed to mark as done: ' + err.message);
    }
  };

  // Toggle completion status
  const toggleWeekCompletion = (week) => {
    try {
      const key = `completed_weeks_${actualCropData._id}`;
      const updated = { ...completedWeeks };
      if (updated[week]) {
        delete updated[week];
      } else {
        updated[week] = true;
      }
      setCompletedWeeks(updated);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (err) {
      alert('Failed to toggle completion: ' + err.message);
    }
  };

  // Fetch AI solution for an issue
  const fetchAiSolution = async (issue, week) => {
    const issueKey = `${issue._id}_${week}`;
    setLoadingAiSolution(prev => ({ ...prev, [issueKey]: true }));

    try {
      const response = await fetch(`${API_URL}/ai-solution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueId: issue._id,
          issueType: issue.issueType,
          details: issue.details,
          week: week,
          selectionId: actualCropData._id,
          cropName: actualCropData.crop,
          season: actualCropData.season,
          state: actualCropData.state,
          location: actualCropData.location || actualCropData.state
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.fallback || 'Failed to get AI solution');
      }

      const data = await response.json();
      setAiSolutions(prev => ({ ...prev, [issueKey]: data.aiSolution }));
      
      // Refresh issues to get updated aiSolution in DB
      await fetchIssues();
    } catch (err) {
      alert('AI Solution Error: ' + err.message);
      setAiSolutions(prev => ({ ...prev, [issueKey]: 'Unable to generate AI solution. Please try again later.' }));
    } finally {
      setLoadingAiSolution(prev => ({ ...prev, [issueKey]: false }));
    }
  };

  // Helper: compute solution from templates (weekly preferred)
  const getSolutionFor = (issueType, week) => {
    if (!issueType || !issueTemplates || !issueTemplates.length) return null;
    const tpl = issueTemplates.find(t => String(t.issueType) === String(issueType) || String(t._id) === String(issueType));
    if (!tpl) return null;

    // Normalize weeklySolutions - sometimes DB stores as array of objects { week, solution }
    if (Array.isArray(tpl.weeklySolutions)) {
      const matched = tpl.weeklySolutions.find(w => Number(w.week) === Number(week));
      if (matched && (matched.solution || matched.note)) {
        // accept either property name
        return matched.solution || matched.note;
      }
    }

    // fallback to template's main solution or description-based fallback
    return tpl.solution || tpl.note || null;
  };

  // Fetch issue templates from backend
  const fetchIssueTemplates = async () => {
    try {
      const res = await fetch(`${API_URL}/issue-templates`);
      if (!res.ok) throw new Error('Failed to fetch issue templates');
      const data = await res.json();
      console.log('Fetched issue templates:', data);
      setIssueTemplates(data || []);
    } catch (err) {
      // fallback: use hardcoded
      const fallback = [
        { issueType: 'heavy-rainfall', description: 'Heavy Rainfall', solution: 'Postpone fertilizer application by 2 weeks.' },
        { issueType: 'pest-infestation', description: 'Pest Infestation', solution: 'Apply recommended pesticide.' },
        { issueType: 'drought', description: 'Drought', solution: 'Increase irrigation frequency.' },
        { issueType: 'nutrient-deficiency', description: 'Nutrient Deficiency', solution: 'Apply recommended nutrients.' }
      ];
      setIssueTemplates(fallback);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes/${actualCropData._id}`);
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      const notesByWeek = {};
      data.forEach(n => { notesByWeek[n.week] = n.note; });
      setNotes(notesByWeek);
    } catch (err) { console.warn('notes fetch failed', err); }
  };

  const fetchIssues = async () => {
    try {
      const res = await fetch(`${API_URL}/issues?selection=${actualCropData._id}`);
      if (!res.ok) {
        console.warn('No issues or fetch failed');
        return;
      }
      const data = await res.json();
      const byWeek = {};
      data.forEach(issue => {
        if (!byWeek[issue.week]) byWeek[issue.week] = [];
        byWeek[issue.week].push(issue);
      });
      setWeekIssues(byWeek);
    } catch (err) { console.warn('issues fetch failed', err); }
  };

  const fetchTimeline = async () => {
    try {
      const params = new URLSearchParams();
      if (actualCropData.season) params.append('season', actualCropData.season);
      if (actualCropData.sowingDate) params.append('sowingDate', actualCropData.sowingDate);
      const response = await fetch(`${API_URL}/timeline/${actualCropData.crop}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch timeline');
      const data = await response.json();
      setTimeline(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddNote = async (week) => {
    const note = prompt(`Enter notes for Week ${week}:`, notes[week] || '');
    if (note !== null) {
      try {
        const res = await fetch(`${API_URL}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selection: actualCropData._id, week, note })
        });
        if (!res.ok) throw new Error('Failed to save note');
        setNotes(prev => ({ ...prev, [week]: note }));
      } catch (err) {
        alert('Failed to save note: ' + err.message);
      }
    }
  };

  const handleReportIssue = (week) => {
    setSelectedWeek(week);
    setSelectedIssueType('');
    setIssueDetails('');
    setIssueSolution(null);
    setShowIssueForm(true);
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIssueType) return alert('Please select an issue type');

    // compute the suggested solution client-side (authoritative if you want)
    const computedSolution = getSolutionFor(selectedIssueType, selectedWeek);

    const issueData = {
      selection: actualCropData._id,
      week: selectedWeek,
      issueType: selectedIssueType,
      details: issueDetails
    };

    try {
      const response = await fetch(`${API_URL}/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData)
      });
      if (!response.ok) throw new Error('Failed to submit issue');
      const result = await response.json();

      // If backend returns recommendedAdjustments.note use it, else fallback to computedSolution
      const serverSolution = result?.recommendedAdjustments?.note || computedSolution || 'See admin solution.';
      setShowIssueForm(false);
      // Refresh issues list to include this new one
      await fetchIssues();
      alert('Issue reported successfully! Solution: ' + serverSolution);

      // Optionally attach the computed solution to local display (if backend didn't)
      setIssueSolution(serverSolution);
    } catch (err) {
      alert('Failed to report issue: ' + err.message);
    }
  };

  const cropName = actualCropData?.crop || <span style={{ color: 'red' }}>Select a crop</span>;
  const seasonName = actualCropData?.season || <span style={{ color: 'red' }}>Select a season</span>;
  const stateName = actualCropData?.state || <span style={{ color: 'red' }}>Select a state</span>;

  return (
    <div>
      <header className="timeline-header">
        Crop Timeline for {cropName} ({seasonName}, {stateName})
      </header>

      {loading ? (
        <p>Loading timeline...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="timeline-list">
          {timeline.map(step => (
            <li 
              key={step.week} 
              className="timeline-step"
              style={{
                opacity: completedWeeks[step.week] ? 0.6 : 1,
                background: completedWeeks[step.week] ? '#d4edda' : '#e6ee9c',
                borderLeft: completedWeeks[step.week] ? '6px solid #28a745' : '6px solid #689f38'
              }}
            >
              <div className="step-header">
                Week {step.week}: {step.task}
                {completedWeeks[step.week] && <span style={{ marginLeft: 10, color: '#28a745', fontWeight: 'bold' }}>✓ Done</span>}
              </div>
              <p>{step.description}</p>
              {notes[step.week] && <p><strong>Notes:</strong> {notes[step.week]}</p>}

              {/* Render issues for this week; prefer server-provided recommendedAdjustments.note, otherwise compute */}
              {weekIssues[step.week] && weekIssues[step.week].map((iss, idx) => {
                const computedIfMissing = !iss.recommendedAdjustments?.note ? getSolutionFor(iss.issueType, step.week) : null;
                const issueKey = `${iss._id}_${step.week}`;
                const aiSol = aiSolutions[issueKey] || iss.aiSolution;
                const isLoadingAi = loadingAiSolution[issueKey];
                
                return (
                  <div
                    key={iss._id || idx}
                    style={{ background: '#fffde7', border: '1px solid #fbc02d', borderRadius: 6, margin: '8px 0', padding: 8 }}
                  >
                    <strong>Issue:</strong> {iss.issueType} <br/>
                    {iss.details && <span><strong>Details:</strong> {iss.details}<br/></span>}
                    
                    {/* Predefined Solution */}
                    <div style={{ marginTop: 8, marginBottom: 8 }}>
                      {iss.recommendedAdjustments?.note ? (
                        <span><strong>Recommended Solution:</strong> {iss.recommendedAdjustments.note}</span>
                      ) : (
                        <span><strong>Recommended Solution:</strong> {computedIfMissing || 'Reviewed by system - please follow recommended best practices.'}</span>
                      )}
                    </div>

                    {/* AI Solution - Highlighted */}
                    <div style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                      color: 'white', 
                      borderRadius: 8, 
                      padding: 12, 
                      marginTop: 10,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <strong style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: 6 }}>🤖</span> AI-Powered Solution
                        </strong>
                        {!isLoadingAi && (
                          <button 
                            onClick={() => fetchAiSolution(iss, step.week)}
                            style={{ 
                              background: 'rgba(255,255,255,0.2)', 
                              color: 'white', 
                              border: '1px solid rgba(255,255,255,0.4)',
                              padding: '4px 12px',
                              borderRadius: 4,
                              cursor: 'pointer',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            {aiSol ? (
                              <>
                                <span>🔄</span> Regenerate
                              </>
                            ) : (
                              'Get AI Solution'
                            )}
                          </button>
                        )}
                      </div>
                      {isLoadingAi ? (
                        <div style={{ fontStyle: 'italic', opacity: 0.9 }}>🔄 Generating intelligent solution...</div>
                      ) : aiSol ? (
                        <div style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.95 }}>{aiSol}</div>
                      ) : (
                        <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '12px' }}>
                          Click "Get AI Solution" for personalized AI-powered recommendations based on your crop and location.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="step-actions">
                <button onClick={() => toggleWeekCompletion(step.week)}>
                  {completedWeeks[step.week] ? 'Mark as Not Done' : 'Mark as Done'}
                </button>
                <button onClick={() => handleReportIssue(step.week)}>Report Issue</button>
                <button onClick={() => handleAddNote(step.week)}>Add Notes</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showIssueForm && (
        <div className="modal" style={{ position: 'fixed', top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000 }}>
          <div style={{ background:'white', borderRadius:10, padding:24, minWidth:350, maxWidth:500, boxShadow:'0 2px 12px #888' }}>
            <h3>Report an Issue for Week {selectedWeek}</h3>
            <form onSubmit={handleIssueSubmit}>
              <label htmlFor="issue-type">Issue Type:</label>
              <select
                id="issue-type"
                name="issue-type"
                required
                value={selectedIssueType}
                onChange={e => {
                  const val = e.target.value;
                  setSelectedIssueType(val);
                  const computed = getSolutionFor(val, selectedWeek);
                  setIssueSolution(computed || 'No predefined solution available.');
                }}
              >
                <option value="">-- Select Issue --</option>
                {issueTemplates.map(tpl => (
                  // allow selection by id or by issueType string if that's what you store
                  <option key={tpl._id || tpl.issueType} value={tpl.issueType || tpl._id}>
                    {tpl.description || tpl.issueType}
                  </option>
                ))}
              </select>

              <label htmlFor="issue-details">Details (optional):</label>
              <textarea
                id="issue-details"
                name="details"
                rows="4"
                placeholder="Describe the issue..."
                value={issueDetails}
                onChange={e => setIssueDetails(e.target.value)}
              />

              <div style={{ marginTop:12, display:'flex', gap:10 }}>
                <button type="submit">Submit Issue</button>
                <button type="button" onClick={() => setShowIssueForm(false)}>Cancel</button>
              </div>
            </form>

            {selectedIssueType && (
              <div style={{ marginTop:10, background:'#e6ee9c', borderRadius:6, padding:8 }}>
                <strong>Solution:</strong> {issueSolution || 'No solution defined.'}
              </div>
            )}
          </div>
        </div>
      )}

      <a href="#dashboard" onClick={(e)=>{e.preventDefault(); navigateTo('dashboard');}} className="back-button">← Back to Dashboard</a>
    </div>
  );
};

export default Timeline;
