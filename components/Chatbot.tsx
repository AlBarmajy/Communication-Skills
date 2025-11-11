import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { getInstructorResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial message from bot
  useEffect(() => {
    const fetchInitialMessage = async () => {
      const initialResponse = await getInstructorResponse([]);
      setHistory([{ role: 'model', parts: [{ text: initialResponse }] }]);
      setIsLoading(false);
    };
    fetchInitialMessage();
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ 
        top: chatContainerRef.current.scrollHeight, 
        behavior: 'smooth' 
    });
  }, [history]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: userInput }],
    };
    
    const newHistory = [...history, newUserMessage];
    setHistory(newHistory);
    setUserInput('');
    setIsLoading(true);

    const botResponseText = await getInstructorResponse(newHistory);

    const botMessage: ChatMessage = {
      role: 'model',
      parts: [{ text: botResponseText }],
    };
    
    setHistory(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="chat-window bg-light">
      <div className="text-center p-3 border-bottom bg-white">
        <h5 className="mb-0">Communication Skills Instructor</h5>
      </div>
      <div ref={chatContainerRef} className="chat-messages">
        {history.map((msg, index) => (
          <div key={index} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`message-bubble ${msg.role}`}>
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="d-flex justify-content-start mb-3">
             <div className="message-bubble model loading-dots">
                <span className="dot1"></span>
                <span className="dot2"></span>
                <span className="dot3"></span>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 border-top bg-white">
        <Form onSubmit={handleSendMessage}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              disabled={isLoading}
              className="rounded-pill"
            />
            <Button type="submit" variant="primary" className="rounded-circle" disabled={isLoading} style={{ width: '40px', height: '40px', padding: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              </svg>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Chatbot;