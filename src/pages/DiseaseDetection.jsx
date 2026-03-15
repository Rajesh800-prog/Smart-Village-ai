import { useState, useRef } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import './DiseaseDetection.css';

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
  const [imgSrc, setImgSrc] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(1); // 1=upload, 2=analyzing, 3=result
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      setResult(null);
      setStep(1);
    }
  };

  const analyzeImage = () => {
    if (!imgSrc) return;
    setIsAnalyzing(true);
    setStep(2);
    setTimeout(() => {
      const random = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setResult(random);
      setIsAnalyzing(false);
      setStep(3);
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

          {/* Upload Zone */}
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

          {/* Action Buttons */}
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
              <Leaf size={64} color="var(--gray-light)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--gray)' }}>Awaiting Analysis</h3>
              <p className="text-muted">Upload a plant photo and click <strong>"Detect Disease"</strong> to see the AI diagnosis here.</p>

              <div className="tips-box mt-4">
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>📝 Tips for best results:</h4>
                <ul style={{ textAlign: 'left', paddingLeft: '1.5rem', color: 'var(--gray)' }}>
                  <li>Use good natural lighting</li>
                  <li>Focus on the affected area</li>
                  <li>Keep the camera steady</li>
                  <li>Avoid blurry photos</li>
                </ul>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center" style={{ padding: '3rem 1rem' }}>
              <div className="ai-loader">
                <Leaf size={48} color="var(--primary)" className="spin-slow" />
              </div>
              <h3 className="mt-4 text-primary">AI is analyzing your photo...</h3>
              <p className="text-muted mt-2">This usually takes a few seconds</p>
              <div className="progress-bar mt-4">
                <div className="progress-fill"></div>
              </div>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="result-content">
              <div className="result-header">
                <AlertCircle size={24} color={severityColor[result.severity]} />
                <div>
                  <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.85rem' }}>Detected Disease</p>
                  <h2 style={{ margin: 0, color: result.severity === 'High' ? '#d32f2f' : '#e65100' }}>
                    {result.disease}
                  </h2>
                </div>
              </div>

              <div className="result-badges">
                <span className="badge" style={{ backgroundColor: '#e8f5e9', color: 'var(--primary-dark)' }}>
                  🎯 Confidence: {result.confidence}
                </span>
                <span className="badge" style={{ backgroundColor: severityColor[result.severity] + '20', color: severityColor[result.severity] }}>
                  ⚠️ Severity: {result.severity}
                </span>
              </div>

              <p className="text-muted mt-2" style={{ lineHeight: 1.7 }}>{result.description}</p>

              <div className="result-section mt-4" style={{ backgroundColor: '#fff8e1', borderLeft: '4px solid #fbc02d' }}>
                <h4>💊 Suggested Treatment</h4>
                <p>{result.treatment}</p>
              </div>

              <div className="result-section mt-2" style={{ backgroundColor: '#e8f5e9', borderLeft: '4px solid var(--primary)' }}>
                <h4>🛡️ Preventive Measures</h4>
                <p>{result.preventive}</p>
              </div>

              <button className="btn btn-primary mt-4" style={{ width: '100%' }} onClick={resetAll}>
                <RefreshCw size={18} /> Analyze Another Plant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
