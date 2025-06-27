"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bot, User } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  time: string;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  const scrollToBottom = () => {
    if (!isFirstLoad.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      type: "bot",
      text: "Hello! I'm HiteshBot. Ask me about my AI projects, research papers, or technical skills. Try asking about my projects, experience, or skills!",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    setMessages([welcomeMessage]);
    isFirstLoad.current = false;
  }, []);

  const getBotResponse = async (userMessage: string) => {
    try {
      const response = await fetch(
        "https://portfolio-67uz.onrender.com/api/v1/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return (
        data.response ||
        "I apologize, but I'm having trouble connecting to my knowledge base at the moment. Please try again later."
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      return "I apologize, but I'm having trouble connecting to my knowledge base at the moment. Please try again later.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const botResponse = await getBotResponse(inputValue);

    const botMessage: Message = {
      id: Date.now(),
      type: "bot",
      text: botResponse,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200/80 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
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
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === "user" ? "flex-row-reverse" : "justify-start"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 ${
                message.type === "user" ? "bg-blue-500" : "bg-purple-500"
              }`}
            >
              {message.type === "user" ? (
                <User size={18} />
              ) : (
                <Bot size={18} />
              )}
            </div>
            <div
              className={`p-3 rounded-xl max-w-[80%] ${
                message.type === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span
                className={`text-xs mt-2 block opacity-70 ${
                  message.type === "user"
                    ? "text-blue-100 text-right"
                    : "text-gray-500"
                }`}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="p-3 rounded-xl bg-white border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};