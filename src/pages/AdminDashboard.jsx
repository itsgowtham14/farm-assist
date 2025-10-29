import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const AdminDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('states');
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectionError, setSectionError] = useState(null);
  // For issue templates
  const [issueTemplates, setIssueTemplates] = useState([]);
  const [issueTemplateForm, setIssueTemplateForm] = useState({ issueType: '', description: '', solution: '', weeklySolutions: [] });
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('fa_admin_token');
    if (onLogout) {
      onLogout();
    }
  };

  // Form schemas for different data types
  const schemas = {
    states: {
      name: { type: 'text', label: 'State Name', required: true },
      code: { type: 'text', label: 'State Code', required: false }
    },
    crops: {
      name: { type: 'text', label: 'Crop Name', required: true },
      seasons: {
        type: 'multiselect',
        label: 'Seasons',
        options: ['Kharif', 'Rabi', 'Zaid'],
        required: false
      },
      allowedStates: {
        type: 'multiselect',
        label: 'Allowed States',
        dynamic: 'states',
        required: false
      },
      description: { type: 'textarea', label: 'Description', required: false }
    },
    timelineTasks: {
      crop: {
        type: 'select',
        label: 'Crop',
        dynamic: 'crops',
        required: true
      },
      season: {
        type: 'select',
        label: 'Season',
        options: ['Kharif', 'Rabi', 'Zaid'],
        required: true
      },
      week: { type: 'number', label: 'Week Number', required: true },
      task: { type: 'text', label: 'Task Name', required: true },
      description: { type: 'textarea', label: 'Description', required: false },
      recommendedProducts: {
        type: 'multiselect',
        label: 'Recommended Products',
        dynamic: 'products',
        required: false
      }
    },
    products: {
      name: { type: 'text', label: 'Product Name', required: true },
      type: {
        type: 'select',
        label: 'Product Type',
        options: ['fertilizer', 'pesticide', 'other'],
        required: true
      },
      activeIngredients: { type: 'text', label: 'Active Ingredients', required: false },
      approval: { type: 'text', label: 'Approval', required: false },
      priceMRP: { 
        type: 'text', 
        label: 'MRP Price', 
        required: false,
        placeholder: 'e.g. ₹266 per 45kg bag, ₹400–₹600 per liter'
      },
      vendorInfo: { 
        type: 'textarea', 
        label: 'Vendor Info (JSON)', 
        required: false,
        placeholder: '{\n  "name": "Vendor Name",\n  "contact": "Contact Info"\n}'
      }
    }
  };
  // Add pseudo-schema for issue templates (for table headers)
  const issueTemplateSchema = {
    issueType: { label: 'Issue Type' },
    description: { label: 'Description' },
    solution: { label: 'Solution' }
  };

  // For dynamic dropdowns
  const [dropdowns, setDropdowns] = useState({ states: [], crops: [], products: [] });

  useEffect(() => {
    setSectionError(null);
    setError(null);
    setFormData({});
    if (activeSection === 'issueTemplates') {
      fetchIssueTemplates();
    } else {
      const loadSection = async () => {
        try {
          await Promise.all([fetchItems(), fetchDropdowns()]);
        } catch (err) {
          setSectionError('Failed to load section data. Please try again.');
        }
      };
      loadSection();
    }
  }, [activeSection]);

  // Fetch issue templates
  const fetchIssueTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/issue-templates`);
      if (!res.ok) throw new Error('Failed to fetch issue templates');
      const data = await res.json();
      setIssueTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add or update issue template
  const handleIssueTemplateSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const method = editingTemplateId ? 'PUT' : 'POST';
      const url = editingTemplateId
        ? `${API_URL}/issue-templates/${editingTemplateId}`
        : `${API_URL}/issue-templates`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueTemplateForm)
      });
      if (!res.ok) throw new Error('Failed to save issue template');
      setIssueTemplateForm({ issueType: '', description: '', solution: '' });
      setEditingTemplateId(null);
      fetchIssueTemplates();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit issue template
  const handleEditTemplate = (tpl) => {
    setEditingTemplateId(tpl._id);
    setIssueTemplateForm({
      issueType: tpl.issueType,
      description: tpl.description,
      solution: tpl.solution,
      weeklySolutions: tpl.weeklySolutions || []
    });
  };

  // Delete issue template
  const handleDeleteTemplate = async (id) => {
    if (!window.confirm('Delete this issue template?')) return;
    try {
      const res = await fetch(`${API_URL}/issue-templates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete issue template');
      fetchIssueTemplates();
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchDropdowns = async () => {
    setDropdownsLoading(true);
    try {
      const token = localStorage.getItem('fa_token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const fetcher = async (type) => {
        try {
          const res = await fetch(`${API_URL}/admin/${type}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (res.status === 401 || res.status === 403) {
            throw new Error('Session expired. Please login again.');
          }
          
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch ${type}`);
          }
          
          return res.json();
        } catch (error) {
          console.error(`Error fetching ${type}:`, error);
          throw error;
        }
      };

      const [states, crops, products] = await Promise.all([
        fetcher('states'),
        fetcher('crops'),
        fetcher('products')
      ]);

      console.log('Fetched dropdowns:', { states, crops, products });
      setDropdowns({ states, crops, products });
    } catch (err) {
      const errorMessage = err.message || 'Failed to load dropdown data';
      console.error('Dropdown error:', errorMessage);
      setError(errorMessage);
      throw err; // Re-throw to be caught by the parent
    } finally {
      setDropdownsLoading(false);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('fa_token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await fetch(`${API_URL}/admin/${activeSection}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch items');
      }

      const data = await response.json();
      console.log('Fetched items:', data);
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Log the current section and form data
    console.log('Current section:', activeSection);
    console.log('Submitting form data:', formData);
    
    // Special handling for products
    let dataToSubmit = { ...formData };
    if (activeSection === 'products') {
      // Parse vendorInfo if it's provided as a string
      if (typeof dataToSubmit.vendorInfo === 'string') {
        try {
          dataToSubmit.vendorInfo = JSON.parse(dataToSubmit.vendorInfo);
        } catch (e) {
          setError('Vendor Info must be valid JSON');
          return;
        }
      }
    }
    
    // Validate form data
    const validationErrors = validateFormData();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }
    
    try {
      const token = localStorage.getItem('fa_token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      console.log('Sending data to server:', dataToSubmit);
      
      const response = await fetch(`${API_URL}/admin/${activeSection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSubmit)
      });
      
      if (response.status === 401 || response.status === 403) {
        throw new Error('Session expired. Please login again.');
      }
      
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Invalid JSON response:', responseText);
        throw new Error('Server returned invalid response');
      }
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create item');
      }
      
      console.log('Server response:', result);
      
      // Reset form and refresh data
      setFormData({});
      await fetchItems();
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to create item. Please check all required fields.');
      return;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${API_URL}/admin/${activeSection}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('fa_token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete item');
      await fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper function to resolve names from IDs
  const resolveFieldValue = (field, value) => {
    const schema = schemas[activeSection][field];
    if (!value) return '';

    // Handle arrays (multiselect fields)
    if (Array.isArray(value)) {
      return value.map(val => {
        if (typeof val === 'object' && val !== null) {
          return val.name || JSON.stringify(val);
        }
        if (schema.dynamic) {
          const item = dropdowns[schema.dynamic]?.find(d => d._id === val);
          return item ? item.name : val;
        }
        return val;
      }).join(', ');
    }

    // Handle objects (referenced fields)
    if (typeof value === 'object' && value !== null) {
      if (value.name) return value.name;
      return JSON.stringify(value);
    }

    // Handle single select fields
    if (schema.dynamic) {
      const item = dropdowns[schema.dynamic]?.find(d => d._id === value);
      return item ? item.name : value;
    }

    // Handle special cases
    if (field === 'vendorInfo' && typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }

    return String(value);
  };

  const renderForm = () => {
    const schema = schemas[activeSection];
    return (
      <form onSubmit={handleSubmit} className="admin-form">
        {Object.entries(schema).map(([field, config]) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{config.label}:</label>
            {config.type === 'textarea' ? (
              <textarea
                id={field}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required={config.required}
                placeholder={config.placeholder}
                rows={field === 'vendorInfo' ? 5 : 3}
              />
            ) : config.type === 'select' ? (
              <select
                id={field}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required={config.required}
              >
                <option value="">Select {config.label}</option>
                {(config.options || (config.dynamic && dropdowns[config.dynamic]?.map(opt => ({ value: opt._id, label: opt.name }))))?.map(opt => (
                  typeof opt === 'object'
                    ? <option key={opt.value} value={opt.value}>{opt.label}</option>
                    : <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : config.type === 'multiselect' ? (
              <select
                id={field}
                multiple
                value={formData[field] || []}
                onChange={(e) => setFormData({
                  ...formData,
                  [field]: Array.from(e.target.selectedOptions, option => option.value)
                })}
                required={config.required}
              >
                {(config.options || (config.dynamic && dropdowns[config.dynamic]?.map(opt => ({ value: opt._id, label: opt.name }))))?.map(opt => (
                  typeof opt === 'object'
                    ? <option key={opt.value} value={opt.value}>{opt.label}</option>
                    : <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input style={{ marginBottom: '10px' }}
                type={config.type}
                id={field}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required={config.required}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn">Add {activeSection.slice(0, -1)}</button>
      </form>
    );
  };

  const validateFormData = () => {
    const schema = schemas[activeSection];
    const errors = [];
    
    Object.entries(schema).forEach(([field, config]) => {
      if (config.required && !formData[field]) {
        errors.push(`${config.label} is required`);
      }
    });
    
    return errors;
  };

  return (
    <div className="admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Admin Dashboard</h2>
        <button 
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🚪 Logout
        </button>
      </div>
      <div className="admin-nav">
        <button className={activeSection === 'states' ? 'active' : ''} onClick={() => setActiveSection('states')} disabled={dropdownsLoading || loading}>States</button>
        <button className={activeSection === 'crops' ? 'active' : ''} onClick={() => setActiveSection('crops')} disabled={dropdownsLoading || loading}>Crops</button>
        <button className={activeSection === 'timelineTasks' ? 'active' : ''} onClick={() => setActiveSection('timelineTasks')} disabled={dropdownsLoading || loading}>Timeline Tasks</button>
        <button className={activeSection === 'products' ? 'active' : ''} onClick={() => setActiveSection('products')} disabled={dropdownsLoading || loading}>Products</button>
        <button className={activeSection === 'issueTemplates' ? 'active' : ''} onClick={() => setActiveSection('issueTemplates')} disabled={loading}>Issue Templates</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {sectionError && <div className="error-message">{sectionError}</div>}
      {(dropdownsLoading || loading) && <div className="loading-message">Loading {activeSection}...</div>}

      <div className="admin-content">
        {activeSection === 'issueTemplates' ? (
          <>
            <section className="form-section">
              <h3>{editingTemplateId ? 'Edit' : 'Add New'} Issue Template</h3>
              <form onSubmit={handleIssueTemplateSubmit} className="admin-form">
                <div className="form-group">
                  <label htmlFor="issueType">Issue Type:</label>
                  <input
                    id="issueType"
                    value={issueTemplateForm.issueType}
                    onChange={e => setIssueTemplateForm({ ...issueTemplateForm, issueType: e.target.value })}
                    required
                    disabled={!!editingTemplateId}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={issueTemplateForm.description}
                    onChange={e => setIssueTemplateForm({ ...issueTemplateForm, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="solution">Solution:</label>
                  <textarea
                    id="solution"
                    value={issueTemplateForm.solution}
                    onChange={e => setIssueTemplateForm({ ...issueTemplateForm, solution: e.target.value })}
                    rows={2}
                  />
                </div>
                  <div className="form-group">
                    <label>Weekly Solutions (optional):</label>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input type="number" placeholder="Week #" value={issueTemplateForm._week || ''} onChange={e => setIssueTemplateForm({ ...issueTemplateForm, _week: e.target.value })} style={{ width: 80 }} />
                      <input placeholder="Solution for that week" value={issueTemplateForm._weekSolution || ''} onChange={e => setIssueTemplateForm({ ...issueTemplateForm, _weekSolution: e.target.value })} />
                      <button type="button" onClick={() => {
                        const wk = parseInt(issueTemplateForm._week, 10);
                        const sol = issueTemplateForm._weekSolution;
                        if (!wk || !sol) return setError('Provide both week number and solution to add');
                        const existing = issueTemplateForm.weeklySolutions || [];
                        // prevent duplicates for same week
                        const filtered = existing.filter(w => w.week !== wk);
                        const updated = [...filtered, { week: wk, solution: sol }].sort((a,b)=>a.week-b.week);
                        setIssueTemplateForm({ ...issueTemplateForm, weeklySolutions: updated, _week: '', _weekSolution: '' });
                      }}>Add</button>
                    </div>
                    {(issueTemplateForm.weeklySolutions || []).length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        {(issueTemplateForm.weeklySolutions || []).map(ws => (
                          <div key={ws.week} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', padding: 6, borderRadius: 6, marginBottom: 6 }}>
                            <div><strong>Week {ws.week}:</strong> {ws.solution}</div>
                            <div>
                              <button type="button" onClick={() => setIssueTemplateForm({ ...issueTemplateForm, weeklySolutions: issueTemplateForm.weeklySolutions.filter(x => x.week !== ws.week) })}>Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                <button type="submit">{editingTemplateId ? 'Update' : 'Add'} Issue Template</button>
                {editingTemplateId && <button type="button" onClick={() => { setEditingTemplateId(null); setIssueTemplateForm({ issueType: '', description: '', solution: '' }); }}>Cancel</button>}
              </form>
            </section>
            <section className="list-section">
              <h3>Existing Issue Templates</h3>
              {loading ? <div>Loading...</div> : (
                <table className="data-table">
                  <thead>
                    <tr>
                      {Object.keys(issueTemplateSchema).map(field => (
                        <th key={field} style={{ textAlign: 'center' }}>{issueTemplateSchema[field].label}</th>
                      ))}
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueTemplates.map(tpl => (
                      <tr key={tpl._id}>
                        <td style={{ textAlign: 'center' }}>{tpl.issueType}</td>
                        <td style={{ textAlign: 'center' }}>{tpl.description}</td>
                        <td style={{ textAlign: 'center' }}>{tpl.solution}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button onClick={() => handleEditTemplate(tpl)} style={{ marginRight: 8 }}>Edit</button>
                          <button onClick={() => handleDeleteTemplate(tpl._id)} className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        ) : (
          <>
            <section className="form-section">
              <h3>Add New {activeSection.slice(0, -1)}</h3>
              {renderForm()}
            </section>
            <section className="list-section">
              <h3>Existing {activeSection}</h3>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      {Object.keys(schemas[activeSection]).map(field => (
                        <th key={field} style={{ textAlign: 'center' }}>{schemas[activeSection][field].label}</th>
                      ))}
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item._id}>
                        {Object.keys(schemas[activeSection]).map(field => (
                          <td key={field} style={{ textAlign: 'center', padding: '8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {resolveFieldValue(field, item[field])}
                          </td>
                        ))}
                        <td style={{ textAlign: 'center' }}>
                          <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;