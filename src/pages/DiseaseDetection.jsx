import { useState } from 'react';
import { Upload, Leaf, AlertCircle } from 'lucide-react';

const DiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      setFile(URL.createObjectURL(uploaded));
      setResult(null);
    }
  };

  const classifyImage = () => {
    if (!file) return;
    setIsClassifying(true);
    // Mocking an AI response
    setTimeout(() => {
      setIsClassifying(false);
      setResult({
        disease: 'Wheat leaf rust (Puccinia triticina)',
        confidence: '94%',
        description: 'Small, circular to oval, orange-brown pustules on wheat leaves.',
        treatment: 'Apply recommended fungicides (e.g., Tebuconazole) immediately. Ensure proper crop rotation for the next cycle.',
      });
    }, 2000);
  };

  return (
    <div className="disease-detection">
      <div className="text-center mb-4">
        <h2>Plant Disease Detection</h2>
        <p className="text-muted">Take a photo of your sick plant, and our AI will tell you what's wrong.</p>
      </div>

      <div className="card text-center mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
        <div style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius)', padding: '2rem', marginBottom: '1rem' }}>
          {file ? (
            <img src={file} alt="Uploaded crop" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--radius)' }} />
          ) : (
            <div style={{ color: 'var(--gray)' }}>
              <Upload size={48} style={{ margin: '0 auto 1rem' }} />
              <p>Click to upload or drag photo here</p>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
          />
        </div>

        <button 
          className="btn btn-primary" 
          onClick={classifyImage} 
          disabled={!file || isClassifying}
          style={{ width: '100%' }}
        >
          {isClassifying ? 'Analyzing Photo...' : 'Identify Disease'}
        </button>
      </div>

      {result && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff3e0' }}>
          <h3 className="flex items-center gap-2 mb-2 text-danger">
            <AlertCircle /> Disease Identified
          </h3>
          <h2 style={{ color: '#d84315' }}>{result.disease}</h2>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <p className="mt-2 text-muted">{result.description}</p>
          
          <h4 className="mt-4 flex items-center gap-2" style={{ color: 'var(--primary-dark)' }}>
            <Leaf /> Recommended Treatment
          </h4>
          <p style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius)', marginTop: '0.5rem' }}>
            {result.treatment}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
