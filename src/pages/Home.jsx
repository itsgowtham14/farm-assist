import React from 'react';

const Home = ({ navigateTo }) => {
  
  return (
    <div >
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
            <p>Heavy rainfall? Pest attack? Our system adapts the plan and gives next steps — and provides AI-powered, location-specific recommendations to help you respond quickly and effectively.</p>
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

          {/* AI-Tailored Solutions card removed — content merged into Unexpected Situations */}
        </div>
      </section>
    </div>
  );
};

export default Home;