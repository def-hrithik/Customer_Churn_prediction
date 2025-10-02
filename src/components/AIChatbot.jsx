import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './AIChatbot.css';

const AIChatbot = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI Assistant for customer churn prediction. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const target = e.target;
    setInputValue(target.value);
    
    // Auto-resize textarea
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Enhanced AI responses for customer churn prediction context
    if (message.includes('churn') || message.includes('predict')) {
      return 'I can help you understand churn prediction! Our model analyzes customer age, tenure, monthly charges, contract type, and payment method to predict the likelihood of customer churn. Would you like me to explain any specific aspect?';
    } else if (message.includes('age') || message.includes('tenure') || message.includes('charges')) {
      return 'These are key factors in our prediction model:\n\n• **Age**: Customer age affects loyalty patterns\n• **Tenure**: How long they\'ve been a customer\n• **Monthly Charges**: Higher charges can increase churn risk\n\nWhich factor would you like to know more about?';
    } else if (message.includes('contract')) {
      return 'Contract types significantly impact churn probability:\n\n• **Month-to-month**: Highest churn risk (35% impact)\n• **One year**: Medium risk (15% impact)\n• **Two year**: Lowest risk (5% impact)\n\nLonger contracts provide better customer retention!';
    } else if (message.includes('payment')) {
      return 'Payment methods affect churn likelihood:\n\n• **Electronic check**: Higher risk (20% impact)\n• **Mailed check**: Medium risk (10% impact)\n• **Bank transfer & Credit card**: Lower risk (5% impact)\n\nAutomatic payment methods tend to improve retention.';
    } else if (message.includes('how') || message.includes('work')) {
      return 'Our AI model works by analyzing 5 key customer attributes and calculating a churn probability score. The system uses advanced algorithms to identify patterns that indicate whether a customer is likely to leave. Want to try making a prediction?';
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! I\'m here to help you with customer churn prediction. You can ask me about:\n\n• How the prediction model works\n• What factors influence churn\n• How to interpret results\n• Tips for customer retention\n\nWhat would you like to know?';
    } else if (message.includes('help') || message.includes('support')) {
      return 'I\'m here to help! I can assist you with:\n\n✅ Understanding churn prediction factors\n✅ Interpreting model results\n✅ Learning about customer retention\n✅ Navigating the prediction tool\n\nJust ask me anything related to customer churn analysis!';
    } else if (message.includes('thanks') || message.includes('thank you')) {
      return 'You\'re very welcome! I\'m always here to help you make better customer retention decisions. Feel free to ask if you have any other questions! 😊';
    } else {
      return 'That\'s an interesting question! While I specialize in customer churn prediction, I\'m here to help you understand how our AI model works, what factors influence customer retention, and how to interpret prediction results. Is there something specific about churn analysis you\'d like to know?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  return (
    <div className="ai-chatbot">
      {/* Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        aria-expanded={isOpen}
      >
        <div className="toggle-icon chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.38 14.98 3.06 16.26L2 22L7.74 20.94C9.02 21.62 10.46 22 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2ZM12 20C10.74 20 9.54 19.72 8.5 19.22L7 20L7.78 18.5C7.28 17.46 7 16.26 7 15C7 9.48 9.48 7 12 7S17 9.48 17 15S14.52 20 12 20Z" fill="currentColor"/>
            <circle cx="9" cy="12" r="1" fill="currentColor"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="15" cy="12" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div className="toggle-icon close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
          </svg>
        </div>
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="ai-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9Z" fill="currentColor"/>
                <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
                <path d="M8 15C8 13.34 9.34 12 11 12H13C14.66 12 16 13.34 16 15V16H8V15Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="header-info">
              <h3>AI Assistant</h3>
              <span className="status">Online</span>
            </div>
          </div>
          <button
            className="minimize-btn"
            onClick={toggleChat}
            aria-label="Minimize chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type}`}
            >
              <div className="message-content">
                {message.content.split('\n').map((line, index) => {
                  // Handle markdown-style formatting
                  if (line.startsWith('• **') && line.includes('**:')) {
                    const parts = line.split('**');
                    return (
                      <div key={index} className="message-bullet">
                        <span className="bullet">•</span>
                        <span className="bold">{parts[1]}</span>
                        <span>{parts[2]}</span>
                      </div>
                    );
                  }
                  return <p key={index}>{line}</p>;
                })}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message bot typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about customer churn prediction..."
              className="message-input"
              rows="1"
              maxLength="500"
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;