import { Mic, Phone } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="contact">
      <div className="text-center mb-4">
        <h2>AI Voice Assistant & Support</h2>
        <p className="text-muted">Talk to our local language AI or contact human support.</p>
      </div>

      <div className="grid grid-2">
        <div className="card text-center" style={{ border: isListening ? '2px solid var(--primary)' : 'none' }}>
          <h3>Ask Agronomist AI</h3>
          <p className="text-muted mb-4">Press the button below and speak in Hindi, Marathi, or English.</p>
          
          <button 
            className="btn" 
            style={{ 
              borderRadius: '50%', 
              width: '100px', 
              height: '100px', 
              backgroundColor: isListening ? 'var(--danger)' : 'var(--primary)',
              color: 'white',
              boxShadow: isListening ? '0 0 20px rgba(211, 47, 47, 0.4)' : 'none',
              animation: isListening ? 'pulse 1.5s infinite' : 'none'
            }}
            onClick={toggleVoice}
          >
            <Mic size={48} />
          </button>
          
          <h4 className="mt-4">{isListening ? 'Listening... Speak now' : 'Tap to Speak'}</h4>
          
          {isListening && (
            <p className="mt-2 text-primary">"How much fertilizer should I use for wheat?"</p>
          )}

          <style>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}</style>
        </div>

        <div className="card text-center">
          <h3>Human Support Line</h3>
          <p className="text-muted mb-4">Need immediate help? Call our toll-free farmer helpline.</p>
          
          <Phone size={64} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ letterSpacing: '2px' }}>1800-425-1515</h2>
          <p className="text-muted mt-2">Available Mon-Sat, 9AM to 6PM</p>
          
          <button className="btn btn-secondary mt-4" style={{ width: '100%' }}>Call Now</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
