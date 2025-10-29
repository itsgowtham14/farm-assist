import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const SelectCrop = ({ onCropSelect, navigateTo, onSessionExpired }) => {
  const [formData, setFormData] = useState({
    state: '',
    season: '',
    crop: '',
    sowingDate: '',
    area: ''
  });
  const [availableCrops, setAvailableCrops] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch(`${API_URL}/metadata/states`);
      if (!response.ok) throw new Error('Failed to fetch states');
      const data = await response.json();
      setStates(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    // Update form data first to ensure we have the latest values
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Clear crop when state or season changes
    if (name === 'state' || name === 'season') {
      newFormData.crop = '';
      
      // Only fetch crops if both state and season are selected
      if (newFormData.state && newFormData.season) {
        await updateCropOptions(newFormData.state, newFormData.season);
      } else {
        setAvailableCrops([]);
      }
    }
  };

  const updateCropOptions = async (state, season) => {
    setError(null);
    
    if (!state || !season) {
      setAvailableCrops([]);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/metadata/crops?state=${encodeURIComponent(state)}&season=${encodeURIComponent(season)}`);
      
      if (response.status === 404) {
        throw new Error('No crops found for selected state and season');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch crops');
      }
      
  const crops = await response.json();
  // Only allow crops that exist in DB for selected state/season
  setAvailableCrops(crops.map(crop => crop.name));
    } catch (err) {
      console.error('Error fetching crops:', err);
      setError(err.message || 'Failed to fetch available crops. Please try again.');
      setAvailableCrops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const token = localStorage.getItem('fa_token');
    if (!token) {
      alert('Please login again.');
      return;
    }

    // Validate all required fields
    if (!formData.state || !formData.season || !formData.crop || !formData.sowingDate || !formData.area) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate area is a positive number
    if (parseFloat(formData.area) <= 0) {
      setError('Land area must be greater than 0');
      return;
    }

    try {
      // Format the data
      const dataToSubmit = {
        ...formData,
        area: parseFloat(formData.area),
        sowingDate: new Date(formData.sowingDate).toISOString()
      };

      console.log('Submitting selection:', dataToSubmit);

      const response = await fetch(`${API_URL}/selections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSubmit)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save crop selection');
      }
      
      console.log('Selection saved successfully:', data);
      onCropSelect(data);
    } catch (err) {
      console.error('Error saving selection:', err);
      setError(err.message || 'Failed to save crop selection. Please try again.');
    }
  };

  return (
    <section className="card">
      <h2>Select Crop Details</h2>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select 
            name="state" 
            id="state" 
            value={formData.state} 
            onChange={handleChange} 
            required
            disabled={loading}
          >
            <option value="">-- Select State --</option>
            {states.map(state => (
              <option key={state._id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="season">Season:</label>
          <select 
            name="season" 
            id="season" 
            value={formData.season} 
            onChange={handleChange} 
            required
            disabled={!formData.state || loading}
          >
            <option value="">-- Select Season --</option>
            <option value="Kharif">Kharif (June to October)</option>
            <option value="Rabi">Rabi (October to March)</option>
            <option value="Zaid">Zaid (March - June)</option>
          </select>
        </div>

        <label htmlFor="crop">Crop:</label>
        <select 
          name="crop" 
          id="crop" 
          value={formData.crop} 
          onChange={handleChange} 
          required
          disabled={!formData.state || !formData.season || availableCrops.length === 0}
        >
          <option value="">-- Select Crop --</option>
          {availableCrops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>

        <label htmlFor="sowing-date">Expected Sowing Date:</label>
        <input 
          type="date" 
          id="sowing-date" 
          name="sowingDate" 
          value={formData.sowingDate} 
          onChange={handleChange} 
        />

        <label htmlFor="area">Land Area (in acres):</label>
        <input 
          type="number" 
          id="area" 
          name="area" 
          value={formData.area} 
          onChange={handleChange} 
          placeholder="e.g., 2.5" 
          step="0.1" 
          min="0" 
        />

        <button type="submit">Add Crop to Dashboard</button>
      </form>
    </section>
  );
};

export default SelectCrop;