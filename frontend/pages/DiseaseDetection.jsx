import { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, RefreshCw, History, Clock, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/DiseaseDetection.css';

const mockDiseases = [
  {
    disease: 'Tomato Early Blight',
    confidence: '96%',
    severity: 'Moderate',
    description: 'Dark brown spots with concentric rings on leaves. Caused by Alternaria solani fungus.',
    treatment: 'Use recommended fungicide spray (Chlorothalonil or Mancozeb). Remove infected leaves immediately and avoid overhead watering.',
    preventive: 'Rotate crops every season. Maintain proper plant spacing for air circulation.',
  },
  {
    disease: 'Wheat Leaf Rust',
    confidence: '94%',
    severity: 'High',
    description: 'Small, circular orange-brown pustules on wheat leaves. Caused by Puccinia triticina.',
    treatment: 'Apply Tebuconazole fungicide immediately. Spray during early morning. Repeat after 14 days if needed.',
    preventive: 'Use rust-resistant wheat varieties. Monitor fields weekly during humid weather.',
  },
  {
    disease: 'Rice Blast',
    confidence: '91%',
    severity: 'High',
    description: 'Diamond-shaped grey or white lesions on rice leaves with brown borders.',
    treatment: 'Apply Tricyclazole or Carbendazim fungicide. Drain flooded fields temporarily to reduce humidity.',
    preventive: 'Avoid excessive nitrogen fertilizer. Plant resistant rice varieties.',
  }
];

const severityColor = { High: '#d32f2f', Moderate: '#f57c00', Low: '#388e3c' };

const DiseaseDetection = () => {
  const { currentUser } = useAuth();
  const [imgSrc, setImgSrc] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(1); // 1=upload, 2=analyzing, 3=result
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // ─── Fetch User's Scan History ───
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, 'scans'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error("Firestore Scan History Error:", err);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      setResult(null);
      setStep(1);
    }
  };

  const analyzeImage = async () => {
    if (!imgSrc) return;
    setIsAnalyzing(true);
    setStep(2);
    
    // Simulate AI delay
    setTimeout(async () => {
      const random = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setResult(random);
      setIsAnalyzing(false);
      setStep(3);

      // ─── Save to Firestore ───
      if (currentUser) {
        try {
          await addDoc(collection(db, 'scans'), {
            userId: currentUser.uid,
            disease: random.disease,
            confidence: random.confidence,
            severity: random.severity,
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          console.error("Error saving scan:", err);
        }
      }
    }, 2500);
  };

  const resetAll = () => {
    setImgSrc(null);
    setResult(null);
    setStep(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="disease-page">
      {/* Page Header */}
      <div className="disease-header text-center mb-4">
        <div className="disease-icon-wrap">
          <Leaf size={36} color="white" />
        </div>
        <h1>Plant Disease Detection</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '550px', margin: '0.5rem auto 0' }}>
          Upload or take a photo of your plant. Our AI will identify the disease and suggest the best treatment.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="step-indicator mb-4">
        {['Upload Photo', 'AI Analysis', 'View Result'].map((label, i) => (
          <div key={i} className={`step-item ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
            <div className="step-circle">{step > i + 1 ? <CheckCircle size={18} /> : i + 1}</div>
            <span className="step-label">{label}</span>
            {i < 2 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`}></div>}
          </div>
        ))}
      </div>

      <div className="disease-layout grid grid-2">
        {/* LEFT: Upload Panel */}
        <div className="card upload-panel">
          <h3 className="mb-2" style={{ color: 'var(--primary-dark)' }}>📷 Upload Your Plant Photo</h3>
          <p className="text-muted mb-4">Take a clear close-up photo of the affected leaves or stem.</p>

          <div
            className={`upload-zone ${imgSrc ? 'has-image' : ''}`}
            onClick={() => fileInputRef.current.click()}
          >
            {imgSrc ? (
              <img src={imgSrc} alt="Uploaded plant" className="uploaded-img" />
            ) : (
              <div className="upload-placeholder">
                <Upload size={52} color="var(--primary-light)" />
                <p>Click or drag to upload image</p>
                <span className="text-muted">JPG, PNG, WEBP supported</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="upload-actions">
            <button
              className="btn btn-outline"
              onClick={() => cameraInputRef.current.click()}
              style={{ flex: 1 }}
            >
              <Camera size={20} /> Take Photo
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <button
              className="btn btn-primary"
              onClick={analyzeImage}
              disabled={!imgSrc || isAnalyzing}
              style={{ flex: 2 }}
            >
              {isAnalyzing ? (
                <><RefreshCw size={20} className="spin" /> Analyzing...</>
              ) : (
                <><Leaf size={20} /> Detect Disease</>
              )}
            </button>
          </div>

          {imgSrc && !isAnalyzing && (
            <button className="btn btn-outline mt-2" onClick={resetAll} style={{ width: '100%', borderColor: 'var(--gray-light)', color: 'var(--gray)' }}>
              <RefreshCw size={16} /> Upload Different Photo
            </button>
          )}
        </div>

        {/* RIGHT: Result Panel */}
        <div className="card result-panel">
          {!result && !isAnalyzing && (
            <div className="result-placeholder text-center">
              <div className="status-orb" style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={40} color="#cbd5e1" />
              </div>
              <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem' }}>AI Diagnosis Lab</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>Upload a leaf photo to trigger our deep-learning neural network for disease identification.</p>
              
              <div className="tips-box mt-4" style={{ textAlign: 'left', background: 'rgba(46, 125, 50, 0.04)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(46, 125, 50, 0.08)' }}>
                <h4 style={{ color: 'var(--primary-dark)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Sparkles size={18} /> Farmers Guide
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ background: 'var(--primary)', width: '6px', height: '6px', borderRadius: '50%', marginTop: '6px' }}></div>
                    <span>Use direct sunlight for better clarity.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ background: 'var(--primary)', width: '6px', height: '6px', borderRadius: '50%', marginTop: '6px' }}></div>
                    <span>Ensure the affected spot is in the center.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ background: 'var(--primary)', width: '6px', height: '6px', borderRadius: '50%', marginTop: '6px' }}></div>
                    <span>Keep the camera 5-10 cm away.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center" style={{ padding: '5rem 1rem' }}>
              <div className="ai-loader floating">
                <div className="scanning-line"></div>
                <Leaf size={48} color="var(--primary)" />
              </div>
              <h3 className="mt-4 text-primary" style={{ fontSize: '1.4rem' }}>Neural Analysis Running...</h3>
              <p className="text-muted mt-2">Connecting to SmartAgri AI Clusters</p>
              <div className="progress-bar mt-4" style={{ height: '8px', background: '#eee', borderRadius: '100px', width: '80%', margin: '2rem auto', overflow: 'hidden' }}>
                <div className="progress-fill" style={{ height: '100%', background: 'var(--primary)', width: '75%', borderRadius: '100px' }}></div>
              </div>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="result-content">
              <div className="result-header">
                <div style={{ background: result.severity === 'High' ? '#fee2e2' : '#fef3c7', padding: '12px', borderRadius: '16px' }}>
                  <AlertCircle size={32} color={severityColor[result.severity]} />
                </div>
                <div>
                  <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>AI diagnosis confirmed</p>
                  <h2 style={{ margin: 0, color: 'var(--primary-dark)', fontSize: '1.8rem' }}>
                    {result.disease}
                  </h2>
                </div>
              </div>

              <div className="result-badges">
                <span className="badge" style={{ backgroundColor: '#f0f9ff', color: '#0369a1' }}>
                  🎯 {result.confidence} AI Confidence
                </span>
                <span className="badge" style={{ backgroundColor: severityColor[result.severity] + '15', color: severityColor[result.severity] }}>
                  ⚠️ {result.severity} Risk
                </span>
              </div>

              <p className="text-muted" style={{ lineHeight: 1.7, fontSize: '1rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <strong style={{ color: 'var(--text-dark)' }}>Insight:</strong> {result.description}
              </p>

              <div className="result-section remedy-card mt-4">
                <h4 style={{ color: '#92400e' }}><Zap size={18} /> Suggested Solution</h4>
                <p style={{ margin: 0, color: '#92400e', fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.6 }}>{result.treatment}</p>
              </div>

              <div className="result-section prevent-card mt-2">
                <h4 style={{ color: '#065f46' }}><ShieldCheck size={18} /> Preventive Measures</h4>
                <p style={{ margin: 0, color: '#065f46', fontSize: '1rem', lineHeight: 1.6 }}>{result.preventive}</p>
              </div>

              <button className="btn btn-primary mt-4" style={{ width: '100%', padding: '1.5rem', borderRadius: '20px', fontSize: '1.25rem' }} onClick={resetAll}>
                <RefreshCw size={24} /> New Field Scan
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── SCAN HISTORY SECTION ─── */}
      {currentUser && history.length > 0 && (
        <div className="card mt-4 p-4">
          <div className="flex items-center gap-2 mb-4">
            <History size={24} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Your Scan History</h3>
          </div>
          <div className="history-list grid grid-3">
            {history.map(item => (
              <div key={item.id} className="history-item glass-card p-3" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white' }}>
                <div style={{ background: severityColor[item.severity] + '15', padding: '10px', borderRadius: '12px' }}>
                  <Leaf size={24} color={severityColor[item.severity]} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.disease}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>
                    <Clock size={12} /> {item.createdAt?.toDate().toLocaleDateString()} · {item.confidence} Match
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
