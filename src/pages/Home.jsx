import React from 'react';

const Home = ({ navigateTo }) => {
  // Calculate left margin to center content
  // Container width: 1475px, Content max-width: 1200px
  // Left margin = (1475 - 1200) / 2 = 137.5px
  const centerMargin = '137.5px';

  return (
    <div style={{ marginLeft: centerMargin }}>
      <section className="banner-section">
        <img src="index.jpeg" alt="Farming scene" className="index-banner" />
      </section>

      <section className="services-container">
        <h2 className="section-title">Our Services</h2>

        <div className="services-grid">
          <div className="service-card">
            <h3>Crop Timelines</h3>
            <p>Get detailed weekly action plans for each crop, from sowing to harvest.</p>
            <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="card-link">View Timeline</a>
          </div>

          <div className="service-card">
            <h3>Unexpected Situations</h3>
            <p>Heavy rainfall? Pest attack? Our system adapts the plan and gives next steps.</p>
            <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="card-link">Report Issues</a>
          </div>

          <div className="service-card">
            <h3>Farming Knowledge Base</h3>
            <p>Access curated guides on fertilizers, irrigation, pesticides, and govt schemes.</p>
            <a href="#knowledgebase" onClick={(e) => { e.preventDefault(); navigateTo('knowledgebase'); }} className="card-link">Browse Knowledge</a>
          </div>

          <div className="service-card">
            <h3>Personal Dashboard</h3>
            <p>Track crop progress, mark tasks as done, and manage your farming plan.</p>
            <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="card-link">Go to Dashboard</a>
          </div>

          <div className="service-card">
            <h3>AI-Tailored Solutions</h3>
            <p>Get personalized, location-specific AI recommendations for your crop issues.</p>
            <a href="#login" onClick={(e) => { e.preventDefault(); navigateTo('login'); }} className="card-link">Get AI Solutions</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;