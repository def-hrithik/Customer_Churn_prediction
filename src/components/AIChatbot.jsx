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
      content: 'Hello! I\'m your AI Assistant powered by Google Gemini. I can help you with customer churn prediction and analysis. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      // Call the server-side API proxy
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversationHistory: messages.slice(-10).map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add AI response to chat
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your request. Please try again or check your connection.',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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