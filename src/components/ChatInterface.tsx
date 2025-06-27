"use client";
import React, { useState, useEffect, useRef } from 'react';
import { IconSend, IconRobot, IconUser } from '@tabler/icons-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  time: string;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'projects': 'I have built several AI projects including TicketConfirmNet (94% accuracy), WasteNet-YOLO (92% accuracy), GuardAI proctoring system, and Multi-RAG-Agent tools. I also created LinkedIn automation processing 1K+ posts daily.',
    'skills': 'I specialize in Python, TensorFlow, PyTorch, FastAPI, Docker, Computer Vision, NLP, and MLOps. I have published research papers and built end-to-end AI systems.',
    'experience': 'I have experience in data ingestion, model training, deployment, and creating production-ready AI applications. My work includes academic research and real-world implementations.',
    'guardai': 'GuardAI is an AI-powered proctoring system that uses computer vision to detect cheating behaviors through gaze tracking and lip movement analysis.',
    'wastenet': 'WasteNet-YOLO is a waste classification system achieving 92% accuracy, helping in automated waste sorting and environmental management.',
    'ticketnet': 'TicketConfirmNet is a deep learning model for ticket confirmation with 94% accuracy, published in ICACCTech 2024.',
    'linkedin': 'I built LinkedIn automation tools that process over 1000 posts daily, helping with content curation and engagement analysis.',
    'default': 'Thank you for your question! I\'m HiteshBot, showcasing my creator\'s AI portfolio. Feel free to ask about projects like "GuardAI", "WasteNet", "TicketConfirmNet", or my "skills".'
  };

  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      type: 'bot',
      text: 'Hello! I\'m HiteshBot. Ask me about my AI projects, research papers, or technical skills. Try asking about "projects", "GuardAI", "WasteNet", or "skills".',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  }, []);

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    for (const key of Object.keys(predefinedResponses)) {
      if (key !== 'default' && input.includes(key)) return predefinedResponses[key];
    }
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { id: Date.now(), type: 'user', text: inputValue, time };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(currentInput);
      const botMessage: Message = { id: Date.now() + 1, type: 'bot', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200/80 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <IconRobot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">HiteshBot</h3>
            <p className="text-blue-200 text-sm">AI Portfolio Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-sm">Online</span>
        </div>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50 relative">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'justify-start'}`}>
            <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
              {message.type === 'user' ? <IconUser size={18} /> : <IconRobot size={18}/>}
            </div>
            <div className={`p-3 rounded-lg max-w-[80%] ${message.type === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 border rounded-bl-none'}`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className={`text-xs mt-2 block opacity-70 ${message.type === 'user' ? 'text-blue-100 text-right' : 'text-gray-500'}`}>{message.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0"><IconRobot size={18}/></div>
            <div className="p-3 rounded-lg bg-white border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        <div className="absolute right-2 top-0 bottom-0 flex items-center">
          <div className="w-1.5 h-[95%] bg-gray-200 rounded-full">
            <div className="w-full h-1/4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-3">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about 'projects' or 'skills'..."
            className="flex-1 bg-slate-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-3 rounded-lg flex items-center justify-center">
            <IconSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};