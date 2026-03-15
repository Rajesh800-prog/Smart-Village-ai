import { Sprout, TrendingUp, IndianRupee, Loader, RotateCcw, CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/CropRecommendation.css';

const cropDatabase = {
  "clay-kharif-high": { crop: "Rice", yield: "5 tons/acre", profit: "₹50,000", icon: "🌾", tips: "Best sown in June-July. Requires standing water up to 15cm. Use certified seeds for best output." },
  "clay-rabi-medium": { crop: "Wheat", yield: "4 tons/acre", profit: "₹40,000", icon: "🌿", tips: "Sow in October-November. Apply nitrogen fertilizer in 2 splits. Irrigate at crown root initiation stage." },
  "sandy-kharif-low": { crop: "Groundnut", yield: "2.5 tons/acre", profit: "₹35,000", icon: "🥜", tips: "Ideal for rainfed conditions. Apply gypsum at pegging stage for better pod development." },
  "sandy-rabi-medium": { crop: "Mustard", yield: "1.5 tons/acre", profit: "₹28,000", icon: "🌼", tips: "Sow in October. Requires 2-3 irrigations. Apply boron for better oil content." },
  "loamy-kharif-high": { crop: "Soybean", yield: "3 tons/acre", profit: "₹45,000", icon: "🫘", tips: "Plant in June with 45cm row spacing. Inoculate seeds with Rhizobium culture. High protein content crop." },
  "loamy-rabi-high": { crop: "Tomato", yield: "20 tons/acre", profit: "₹80,000", icon: "🍅", tips: "Transplant 25-day old seedlings. Requires staking. Drip irrigation is highly recommended." },
  "black-kharif-medium": { crop: "Cotton", yield: "2 tons/acre", profit: "₹60,000", icon: "☁️", tips: "Sow in May-June. Requires 5-6 irrigations. Apply potassium fertilizer to improve fiber quality." },
  "black-rabi-medium": { crop: "Chickpea", yield: "1.8 tons/acre", profit: "₹30,000", icon: "🫘", tips: "Sow in October-November. Requires minimal irrigation. Highly profitable in dry conditions." },
  "red-kharif-medium": { crop: "Maize", yield: "6 tons/acre", profit: "₹42,000", icon: "🌽", tips: "High yielding hybrid varieties recommended. Requires 3-4 irrigations. Apply urea at knee-high stage." },
};

const getKey = (soil, season, water) => {
  const key = `${soil}-${season}-${water}`;
  return cropDatabase[key] || {
    crop: "Pearl Millet (Bajra)",
    yield: "2 tons/acre",
    profit: "₹25,000",
    icon: "🌾",
    tips: "Highly drought tolerant and suitable for your conditions. Sow in June-July with minimal water requirement."
  };
};

const CropRecommendation = () => {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    soilType: '',
    location: '',
    landSize: '',
    season: '',
    water: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch History
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, 'recommendations'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setHistory(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error("Firestore Error:", err);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    
    // Simulate AI logic
    setTimeout(async () => {
      const rec = getKey(form.soilType, form.season, form.water);
      setResult(rec);
      setIsLoading(false);

      // SAVE TO FIRESTORE
      try {
        await addDoc(collection(db, 'recommendations'), {
          ...form,
          ...rec,
          userId: currentUser?.uid || 'guest',
          createdAt: serverTimestamp(),
        });
        toast.success("Recommendation saved to your history!");
      } catch (err) {
        console.error("Error saving recommendation:", err);
      }
    }, 2000);
  };

  const handleReset = () => {
    setForm({ soilType: '', location: '', landSize: '', season: '', water: '' });
    setResult(null);
  };

  const estimatedTotal = form.landSize && result
    ? `₹${(parseFloat(result.profit.replace(/[^0-9]/g, '')) * parseFloat(form.landSize) / 100000).toFixed(1)}L`
    : null;

  return (
    <div className="rec-page">
      {/* Header */}
      <div className="rec-header text-center mb-4">
        <div className="rec-icon-wrap">
          <Sprout size={36} color="white" />
        </div>
        <h1>AI Crop Recommendation</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: 520, margin: '0.5rem auto 0' }}>
          Tell us about your farm — our AI will recommend the best crop to maximize your income.
        </p>
      </div>

      <div className="grid grid-2 rec-layout">
        {/* FORM */}
        <div className="card">
          <h3 className="mb-4" style={{ color: 'var(--primary-dark)' }}>🌍 Enter Your Farm Details</h3>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="soilType">Soil Type</label>
              <select name="soilType" id="soilType" value={form.soilType} onChange={handleChange} required>
                <option value="">-- Select Soil Type --</option>
                <option value="clay">Clay Soil</option>
                <option value="sandy">Sandy Soil</option>
                <option value="loamy">Loamy Soil</option>
                <option value="black">Black Cotton Soil</option>
                <option value="red">Red Laterite Soil</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location / District</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="e.g., Nashik, Maharashtra"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="landSize">Land Size (in Acres)</label>
              <input
                type="number"
                name="landSize"
                id="landSize"
                placeholder="e.g., 2.5"
                min="0.1"
                step="0.1"
                value={form.landSize}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="season">Growing Season</label>
              <select name="season" id="season" value={form.season} onChange={handleChange} required>
                <option value="">-- Select Season --</option>
                <option value="kharif">Kharif (June–October)</option>
                <option value="rabi">Rabi (October–March)</option>
                <option value="zaid">Zaid (March–June)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="water">Water Availability</label>
              <select name="water" id="water" value={form.water} onChange={handleChange} required>
                <option value="">-- Select Availability --</option>
                <option value="high">High (River / Canal nearby)</option>
                <option value="medium">Medium (Borewell / Pond)</option>
                <option value="low">Low (Rainfed only)</option>
              </select>
            </div>

            <div className="form-actions mt-4">
              <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ flex: 2 }}>
                {isLoading
                  ? <><Loader size={20} className="spin" /> Analyzing...</>
                  : <><Sprout size={20} /> Get AI Recommendation</>}
              </button>
              <button type="button" className="btn btn-outline" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* RESULT */}
        <div className="card rec-result-panel">
          {!result && !isLoading && (
            <div className="result-empty text-center">
              <Sprout size={64} color="var(--gray-light)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--gray)' }}>No Recommendation Yet</h3>
              <p className="text-muted">Fill in your farm details and press <strong>"Get AI Recommendation"</strong> to see results.</p>
              <div className="example-box mt-4">
                <p className="font-bold mb-1" style={{ color: 'var(--primary-dark)' }}>📌 Example Output:</p>
                <p>Recommended Crop: <strong>Rice</strong></p>
                <p>Expected Yield: <strong>5 tons/acre</strong></p>
                <p>Estimated Profit: <strong>₹50,000/acre</strong></p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center result-loading">
              <div className="ai-spin-wrap">
                <Sprout size={48} color="var(--primary)" className="spin-slow" />
              </div>
              <h3 className="mt-4 text-primary">AI is calculating...</h3>
              <p className="text-muted mt-1">Analyzing soil, season, and water data</p>
              <div className="progress-bar mt-4">
                <div className="progress-fill"></div>
              </div>
            </div>
          )}

          {result && !isLoading && (
            <div className="rec-result-content">
              <div className="rec-result-header">
                <div className="crop-emoji">{result.icon}</div>
                <div>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>Top Recommended Crop</p>
                  <h1 style={{ margin: 0, color: 'var(--primary-dark)', fontSize: '2rem' }}>{result.crop}</h1>
                </div>
                <CheckCircle size={28} color="var(--primary)" style={{ marginLeft: 'auto' }} />
              </div>

              <div className="rec-metrics">
                <div className="metric-card">
                  <div className="metric-icon" style={{ backgroundColor: '#e8f5e9' }}>
                    <TrendingUp size={24} color="var(--primary)" />
                  </div>
                  <p className="text-muted">Expected Yield</p>
                  <h3 className="text-primary-dark">{result.yield}</h3>
                </div>
                <div className="metric-card">
                  <div className="metric-icon" style={{ backgroundColor: '#fff8e1' }}>
                    <IndianRupee size={24} color="#f57c00" />
                  </div>
                  <p className="text-muted">Profit per Acre</p>
                  <h3 style={{ color: '#e65100' }}>{result.profit}</h3>
                </div>
                {form.landSize && (
                  <div className="metric-card" style={{ gridColumn: '1/-1', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' }}>
                    <div className="metric-icon" style={{ backgroundColor: '#a5d6a7' }}>
                      <IndianRupee size={24} color="var(--primary-dark)" />
                    </div>
                    <p style={{ color: 'var(--primary-dark)', margin: 0 }}>Total Estimated Income ({form.landSize} acres)</p>
                    <h2 style={{ color: 'var(--primary-dark)', margin: 0 }}>
                      {`₹${(parseInt(result.profit.replace(/[^0-9]/g, '')) * parseFloat(form.landSize)).toLocaleString('en-IN')}`}
                    </h2>
                  </div>
                )}
              </div>

              <div className="rec-tips mt-4">
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>🌱 Expert Farming Tips</h4>
                <p style={{ lineHeight: 1.7, color: 'var(--text-dark)' }}>{result.tips}</p>
              </div>

              <button className="btn btn-outline mt-4" onClick={handleReset} style={{ width: '100%' }}>
                <RotateCcw size={18} /> Try Another Combination
              </button>
            </div>
          )}
        </div>
      </div>

      {/* HISTORY SECTION */}
      {history.length > 0 && (
        <div className="rec-history mt-4">
          <div className="section-header-inline">
            <Clock size={24} className="text-primary" />
            <h2 className="mb-0">Your Recommendation History</h2>
          </div>
          <div className="history-grid mt-3">
            {history.map(item => (
              <div key={item.id} className="history-card">
                <div className="history-top">
                  <span className="history-emoji">{item.icon}</span>
                  <div>
                    <h4>{item.crop}</h4>
                    <span className="history-date">
                      {item.createdAt?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="history-details">
                  <div><MapPin size={12} /> {item.location}</div>
                  <div><Sprout size={12} /> {item.soilType} Soil</div>
                </div>
                <div className="history-metrics">
                  <span><strong>{item.yield}</strong></span>
                  <span className="text-primary"><strong>{item.profit}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
