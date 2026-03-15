const Home = () => {
  return (
    <div className="home-container">
      <div className="hero section text-center" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 2rem', borderRadius: 'var(--radius)', marginBottom: '2rem' }}>
        <h1>Welcome to Smart Village AI</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Empowering farmers with Artificial Intelligence to improve crop productivity and income.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/disease-detection" className="btn btn-secondary" style={{ backgroundColor: 'white' }}>Detect Disease</a>
          <a href="/recommendation" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Crop Advice</a>
        </div>
      </div>

      <h2 className="text-center mb-4">Our Services</h2>
      <div className="grid grid-3">
        <div className="card text-center">
          <h3>Disease Detection</h3>
          <p className="text-muted">Upload a photo of your crop to instantly identify diseases and get treatment advice.</p>
        </div>
        <div className="card text-center">
          <h3>Weather Alerts</h3>
          <p className="text-muted">Receive timely weather forecasts and critical alerts to protect your harvest.</p>
        </div>
        <div className="card text-center">
          <h3>Farmer Marketplace</h3>
          <p className="text-muted">Sell your produce directly to buyers at the best market prices.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
