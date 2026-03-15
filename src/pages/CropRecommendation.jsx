import { useState } from 'react';
import { Sprout } from 'lucide-react';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock AI delay
    setTimeout(() => {
      setRecommendation("Based on a soil pH of " + formData.ph + " and expected rainfall, we highly recommend planting Soybeans or Cotton for optimal yield this season.");
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="crop-recommendation">
      <div className="text-center mb-4">
        <h2>AI Crop Recommendation</h2>
        <p className="text-muted">Enter your soil and weather parameters to find the best crop for your farm.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Location / Region</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Punjab" required />
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Nitrogen (N)</label>
                <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} placeholder="Value" required />
              </div>
              <div className="form-group">
                <label>Phosphorous (P)</label>
                <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} placeholder="Value" required />
              </div>
              <div className="form-group">
                <label>Potassium (K)</label>
                <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} placeholder="Value" required />
              </div>
              <div className="form-group">
                <label>Soil pH</label>
                <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} placeholder="e.g., 6.5" required />
              </div>
            </div>
            <div className="form-group">
              <label>Average Rainfall (mm)</label>
              <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="e.g., 200" required />
            </div>
            <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Calculating AI Model...' : 'Get Recommendation'}
            </button>
          </form>
        </div>

        <div className="card flex items-center justify-center text-center" style={{ backgroundColor: recommendation ? '#e8f5e9' : '#f5f5f5' }}>
          {recommendation ? (
            <div>
              <Sprout size={64} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 className="text-primary-dark">Top Recommendation</h3>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{recommendation}</p>
            </div>
          ) : (
            <div className="text-muted">
              <p>Fill out the form and submit to see your AI-tailored crop recommendations here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
