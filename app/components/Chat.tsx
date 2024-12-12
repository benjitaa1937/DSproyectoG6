'use client';
import { useState } from 'react';


type Message = {
  role: 'user' | 'assistant';
  content: string; 
};

export default function ChatGPT() {
  const [input, setInput] = useState<string>(''); 
  const [messages, setMessages] = useState<Message[]>([]); 

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage: Message = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botMessage]); 
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    }

    setInput(''); 
  };

  return (
    <div>
      <h1>ChatGPT</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
