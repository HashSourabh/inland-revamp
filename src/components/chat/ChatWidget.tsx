'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHTML?: boolean;
}

interface ChatWidgetProps {
  apiBase?: string;
}

export default function ChatWidget({ apiBase }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your real estate assistant. I can help you find properties in Andalucia, Spain. What are you looking for?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatEndpoint = apiBase || '/api/ai/message';

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, role: 'user' | 'assistant', isHTML = false) => {
    setMessages((prev) => [...prev, { role, content, isHTML }]);
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    // Clear input
    setInputValue('');

    // Add user message
    addMessage(message, 'user');

    // Show loading
    setIsLoading(true);

    try {
      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to send message');
      }

      // Add assistant response (supports HTML)
      if (data.reply) {
        addMessage(data.reply, 'assistant', true);
      } else {
        addMessage('I apologize, but I didn\'t receive a response. Please try again.', 'assistant');
      }
    } catch (error: any) {
      console.error('Chat widget error:', error);
      addMessage(`Error: ${error.message || 'Failed to send message. Please try again.'}`, 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1d3557] text-white rounded-full shadow-lg hover:bg-[#457b9d] transition-all duration-300 hover:scale-105 flex items-center justify-center md:bottom-6 md:right-6 sm:bottom-4 sm:right-4 sm:w-12 sm:h-12"
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slide-up sm:bottom-20 sm:right-4 sm:h-[calc(100vh-5rem)]"
          style={{ width: '800px', maxWidth: 'calc(100vw - 3rem)' }}
        >
          {/* Header */}
          <div className="bg-[#1d3557] text-white px-5 py-4 flex justify-between items-center rounded-t-xl">
            <div>
              <h3 className="text-lg font-semibold">Real Estate Assistant</h3>
              <p className="text-xs opacity-90 mt-1">Ask me about properties</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl hover:bg-white/10 rounded px-2 py-1 transition-colors"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'ml-auto bg-[#1d3557] text-white rounded-br-md'
                    : 'mr-auto bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                }`}
              >
                {msg.isHTML ? (
                  <div
                    className="prose prose-sm max-w-none [&_.property-card]:chat-widget-property-card [&_.property-card]:my-2 [&_a]:text-[#1d3557] [&_a]:underline [&_a:hover]:no-underline [&_img]:rounded [&_img]:max-w-full [&_h3]:text-[#1d3557] [&_h3]:font-semibold [&_h3]:text-base [&_h3]:my-2 [&_p]:text-sm [&_p]:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="mr-auto max-w-[80%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#1d3557] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#1d3557] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-[#1d3557] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#1d3557] transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="w-11 h-11 bg-[#1d3557] text-white rounded-full hover:bg-[#457b9d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease;
        }
      `}</style>
    </>
  );
}

