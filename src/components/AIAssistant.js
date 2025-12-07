import React, { useState, useRef, useEffect } from 'react';
import { smartChat, getSuggestions, getMotivation, getTips } from '../services/smartAssistant';
import { useAuth } from '../context/AuthContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm your AI goal buddy! I can help you come up with fun goals, give you tips, and cheer you on! What would you like help with?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: "Suggest goals", action: "suggest" },
    { label: "Motivate me!", action: "motivate" },
    { label: "Goal tips", action: "tips" }
  ];

  const handleQuickAction = async (action) => {
    setIsLoading(true);
    let response;

    try {
      switch (action) {
        case 'suggest':
          response = await getSuggestions();
          break;
        case 'motivate':
          response = await getMotivation(100, 5);
          break;
        case 'tips':
          response = await getTips();
          break;
        default:
          response = { message: "I'm not sure how to help with that!" };
      }

      if (!response.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Error with quick action:', error);
    }

    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    }]);

    setIsLoading(true);

    try {
      const response = await smartChat(userMessage);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.error ? response.message : response.message,
        timestamp: new Date().toISOString(),
        error: response.error
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops! Something went wrong. Can you try asking again?",
        timestamp: new Date().toISOString(),
        error: true
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button 
        className={`ai-float-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Assistant"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window">
          <div className="ai-header">
            <h3>🤖 AI Goal Buddy</h3>
            <button className="ai-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="ai-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`ai-message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                </div>
                {msg.error && (
                  <div className="message-error">⚠️ AI not configured</div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="ai-message assistant">
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action.action)}
                disabled={isLoading}
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="ai-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="ai-input"
            />
            <button 
              className="ai-send-btn"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
