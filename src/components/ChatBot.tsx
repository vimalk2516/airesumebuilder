import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader, Lightbulb } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { geminiService } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export const ChatBot: React.FC = () => {
  const { resumeData } = useResume();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI resume advisor. I can help you improve your resume, suggest skills, answer career questions, and provide guidance. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "What skills should I add for my role?",
        "How can I improve my resume summary?",
        "What are current industry trends?",
        "How do I make my resume ATS-friendly?"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateFollowUpSuggestions = (botResponse: string, userMessage: string): string[] => {
    const suggestions: string[] = [];
    
    if (userMessage.toLowerCase().includes('skill')) {
      suggestions.push(
        "What certifications should I pursue?",
        "How do I showcase these skills?",
        "What's trending in my industry?"
      );
    } else if (userMessage.toLowerCase().includes('resume') || userMessage.toLowerCase().includes('improve')) {
      suggestions.push(
        "How can I quantify my achievements?",
        "What keywords should I include?",
        "How long should my resume be?"
      );
    } else if (userMessage.toLowerCase().includes('career') || userMessage.toLowerCase().includes('job')) {
      suggestions.push(
        "How do I prepare for interviews?",
        "What salary should I expect?",
        "How do I negotiate offers?"
      );
    } else {
      suggestions.push(
        "What skills are trending in my field?",
        "How can I improve my LinkedIn?",
        "What are common resume mistakes?"
      );
    }
    
    return suggestions.slice(0, 3);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await geminiService.chatWithBot(currentMessage, resumeData);
      const suggestions = generateFollowUpSuggestions(response, currentMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble responding right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <div>
            <h3 className="font-semibold">AI Resume Advisor</h3>
            <p className="text-xs opacity-90">Powered by Gemini AI</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.isBot && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {!message.isBot && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div className="text-sm leading-relaxed">{message.text}</div>
                </div>
                <div className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            {/* Follow-up suggestions */}
            {message.isBot && message.suggestions && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Lightbulb className="w-3 h-3" />
                  <span>Quick questions:</span>
                </div>
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(suggestion)}
                    className="w-full text-left text-xs p-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 text-blue-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your resume..."
            className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to send • Get personalized advice
        </p>
      </div>
    </div>
  );
};