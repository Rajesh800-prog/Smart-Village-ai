import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, MessageCircle, HelpCircle, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/AIAssistant.css';

const AIAssistant = () => {
  const { farmerProfile } = useAuth();
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'ai', 
      text: `Namaste${farmerProfile?.name ? ' ' + farmerProfile.name : ''}! I am your AI Farming Assistant. How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const knowledgeBase = [
    { 
      keywords: ['rice', 'fertilizer', 'urea'], 
      answer: "For Rice, the standard recommendation is N:P:K at 120:60:60 kg/hectare. Apply Urea in three split doses: at transplanting, active tillering, and panicle initiation stages for best yield."
    },
    { 
      keywords: ['tomato', 'yellow', 'spots', 'blight'], 
      answer: "Yellow spots on tomato leaves often indicate Early Blight. I recommend applying a Mancozeb spray and removing infected lower leaves. Ensure proper spacing for air circulation."
    },
    { 
      keywords: ['cotton', 'pests', 'bollworm'], 
      answer: "For Cotton Bollworm, you should check your fields every 3 days. Use pheromone traps and if infestation exceeds 5% of bolls, apply a neem-based insecticide or spinosad."
    },
    { 
      keywords: ['wheat', 'water', 'irrigation'], 
      answer: "Wheat requires 4-6 irrigations depending on soil. The most critical stage is the 'Crown Root Initiation' (21 days after sowing). Do not miss this irrigation!"
    },
  ];

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let responseText = "That's an interesting question. I'm analyzing your request... Based on general agricultural practices, I recommend consulting a local kisan center for soil-specific advice, but I can tell you that maintaining proper soil moisture is key for most crops.";

      const match = knowledgeBase.find(item => 
        item.keywords.some(k => currentInput.includes(k))
      );

      if (match) {
        responseText = match.answer;
      } else if (currentInput.includes("hello") || currentInput.includes("hi")) {
        responseText = "Hello! I'm here to help with your farming queries. Ask me about fertilizers, diseases, or crop management!";
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestQuestion = (q) => {
    setInput(q);
  };

  return (
    <div className="ai-assistant-page">
      <div className="chat-container glass-card">
        {/* Header */}
        <div className="chat-header">
          <div className="ai-identity">
            <div className="ai-avatar pulse">
              <Bot size={28} />
              <div className="online-indicator"></div>
            </div>
            <div>
              <h3>Farming Strategist</h3>
              <p>AI Expert • Online</p>
            </div>
          </div>
          <div className="header-actions">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
        </div>

        {/* Message Area */}
        <div className="message-area" ref={scrollRef}>
          {messages.map((m) => (
            <div key={m.id} className={`message-wrapper ${m.type}`}>
              <div className="message-bubble">
                {m.type === 'ai' && <div className="bubble-icon"><Bot size={14} /></div>}
                <div className="message-text">
                  {m.text}
                  <span className="message-time">{m.time}</span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper ai">
              <div className="message-bubble typing">
                <Loader2 size={16} className="animate-spin" />
                <span>Strategist is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length < 4 && (
          <div className="chat-suggestions">
            <p className="suggestion-label"><HelpCircle size={14} /> Try asking:</p>
            <div className="suggestion-list">
              <button onClick={() => suggestQuestion("What fertilizer for rice?")}>
                Fertilizer for rice? <ChevronRight size={14} />
              </button>
              <button onClick={() => suggestQuestion("Tomato leaf yellow spots")}>
                Tomato spots? <ChevronRight size={14} />
              </button>
              <button onClick={() => suggestQuestion("Wheat irrigation cycle")}>
                Wheat water? <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <form className="chat-input-area" onSubmit={handleSend}>
          <div className="input-box-wrapper">
            <input 
              type="text" 
              placeholder="Ask me anything about your farm..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
