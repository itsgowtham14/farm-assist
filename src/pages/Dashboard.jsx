import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Dashboard = ({ navigateTo, onSessionExpired }) => {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserSelections();
  }, []);

  const fetchUserSelections = async () => {
    try {
      const token = localStorage.getItem('fa_token');

      const response = await fetch(`${API_URL}/selections`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('fa_token');
        if (onSessionExpired) onSessionExpired();
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch crop selections');
      
      const data = await response.json();
      setSelections(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const viewTimeline = (selection) => {
    // Store the selected crop data for timeline view
    localStorage.setItem('current_crop', JSON.stringify(selection));
    window.selectedCrop = selection; // For direct prop passing
    navigateTo('timeline');
  };

  if (loading) return <div>Loading your crops...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <section className="card">
        <h2>Your Crops</h2>
        {selections.length === 0 ? (
          <div>
            <p>No crops selected yet.</p>
            <button onClick={() => navigateTo('select-crop')}>Add Your First Crop</button>
          </div>
        ) : (
          <>
            {selections.map((selection, index) => (
              <div key={selection._id || index} className="crop-card">
                <table>
                  <tbody>
                    <tr>
                      <th>State</th>
                      <td>{selection.state}</td>
                    </tr>
                    <tr>
                      <th>Season</th>
                      <td>{selection.season}</td>
                    </tr>
                    <tr>
                      <th>Crop</th>
                      <td>{selection.crop}</td>
                    </tr>
                    <tr>
                      <th>Sowing Date</th>
                      <td>{new Date(selection.sowingDate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <th>Land Area</th>
                      <td>{selection.area} acres</td>
                    </tr>
                  </tbody>
                </table>
                <div className="crop-actions">
                  <button onClick={() => viewTimeline(selection)}>View Timeline</button>
                </div>
              </div>
            ))}
            <button onClick={() => navigateTo('select-crop')} className="add-crop-btn">
              Add Another Crop
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;