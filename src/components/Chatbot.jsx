import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. How can I help you with customer churn prediction today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('churn') || input.includes('prediction')) {
      return "Customer churn prediction helps identify customers likely to leave. Our AI model analyzes various factors like contract type, monthly charges, and service usage to predict churn probability. Would you like to know more about specific features?";
    }
    
    if (input.includes('how') && input.includes('work')) {
      return "Our prediction model works by analyzing customer data including demographics, service usage patterns, billing information, and contract details. The AI processes this information to calculate a churn probability score and risk level. You can try it on the Prediction page!";
    }
    
    if (input.includes('feature') || input.includes('data')) {
      return "We analyze key features like: Age, Tenure, Monthly/Total charges, Contract type, Internet service, Payment method, and various service add-ons. Each feature contributes to the overall churn risk assessment.";
    }
    
    if (input.includes('accuracy') || input.includes('reliable')) {
      return "Our model achieves approximately 94% accuracy with high precision and recall rates. We use advanced machine learning algorithms including Random Forest and Gradient Boosting to ensure reliable predictions.";
    }
    
    if (input.includes('export') || input.includes('download')) {
      return "Yes! On the Prediction page, you can export results in both PDF and CSV formats. PDF exports include charts and detailed reports, while CSV exports provide raw data for further analysis.";
    }
    
    if (input.includes('algorithm') || input.includes('model') || input.includes('ml') || input.includes('ai')) {
      return "We use multiple machine learning algorithms including Random Forest, Gradient Boosting, Logistic Regression, and Neural Networks. The ensemble approach helps achieve better accuracy and reliability in predictions.";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('free')) {
      return "Our platform offers flexible pricing options. You can start with our free trial to test the prediction capabilities. For detailed pricing information, please contact our sales team.";
    }
    
    if (input.includes('demo') || input.includes('try') || input.includes('test')) {
      return "Great! You can try our prediction system right now. Go to the Prediction page, enter sample customer data, and see how our AI model works. It's completely free to test!";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('help')) {
      return "Hello! I'm here to help you with customer churn prediction. You can ask me about how our AI model works, what features we analyze, export options, or any other questions about the platform.";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know about customer churn prediction or our platform? I'm here to help!";
    }
    
    if (input.includes('support') || input.includes('contact') || input.includes('help')) {
      return "For additional support, you can contact our team through the contact form or email. I'm also here 24/7 to answer questions about the platform, features, and how to get the best results from our AI model.";
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! Could you provide more details about what specific aspect of customer churn prediction you're interested in?",
      "I'd be happy to help! For the most accurate information about your specific use case, you might want to try our prediction tool with your data.",
      "Great question! Our platform offers comprehensive churn analysis. Would you like to know more about the prediction process, data requirements, or export features?",
      "I can help you with information about customer churn prediction, model accuracy, data features, or how to use our platform. What would you like to explore?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div 
        className={`chat-float-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChatbot}
        title={isOpen ? 'Close Chat' : 'Open Chat Assistant'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 9h8M8 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <div className="chat-notification-dot"></div>
      </div>

      {/* Chat Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/>
              <path d="M12 8C15.3137 8 18 10.6863 18 14V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V14C6 10.6863 8.68629 8 12 8Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="chatbot-info">
            <h3>AI Assistant</h3>
            <span className="online-status">Online</span>
          </div>
          <button 
            className="chatbot-minimize"
            onClick={toggleChatbot}
            aria-label="Minimize chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender}`}
            >
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/>
                    <path d="M12 8C15.3137 8 18 10.6863 18 14V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V14C6 10.6863 8.68629 8 12 8Z" fill="currentColor"/>
                  </svg>
                </div>
              )}
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.timestamp}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot typing">
              <div className="message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/>
                  <path d="M12 8C15.3137 8 18 10.6863 18 14V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V14C6 10.6863 8.68629 8 12 8Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="chatbot-input"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;