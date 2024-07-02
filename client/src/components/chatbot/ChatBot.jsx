import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatBot.css';

const apiKey = "AIzaSyCOa6owelAuSQvIWlQHmkACj0Gr929f2zc";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState(null);
  const bottomRef = useRef(null);

  const initialPrompt = `
    Sos el encargado de contestar dudas a usuarios. Sos un chatbot con estas funciones: dieta, rutina, resolver dudas.
Necesito que cuando te hagan una pregunta contesta amablemente y muy bien con respuestas claras.
Cuando te pregunten alguna rutina pedile que el usuario te de el peso, edad, frecuencia de entrenamiento que quiere y objetivo (ganar fuerza, ganar masa muscular, enfoque a algun deporte,etc.), a partir de eso generes lo que el usuario te pidio.
 si algun usuario pregunta sobre el equipo de trabajo contestale eso.
En la pagina en la que estas alojado se puede hacer esto: "dieta, rutinas, consejos deportivos, alternativas de comidas etc"
  `;

  useEffect(() => {
    const initializeChat = async () => {
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: initialPrompt }] },
        ],
        generationConfig: { maxOutputTokens: 10000 }
      });
      setMessages([{ text: '¡Hola! ¿En qué puedo ayudarte hoy?', sender: 'bot' }]);
      setChatInstance(chat);
    };

    initializeChat();
  }, []);

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (!loading) scrollToBottom();
  }, [loading]);

  const addMessageToHistory = (role, message) => {
    setMessages((prev) => [...prev, { text: message, sender: role }]);
  };

  const fetchData = async (userInput) => {
    if (!chatInstance) {
      console.error("Chat instance is not ready yet");
      return;
    }
    const result = await chatInstance.sendMessage(userInput);
    const response = await result.response;
    const botMessage = response.text();
    return botMessage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      setLoading(true);
      const userMessage = input.trim();
      addMessageToHistory("user", userMessage);
      const botResponse = await fetchData(userMessage);
      if (botResponse) {
        addMessageToHistory("bot", botResponse);
      }
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chatbot-header">
          <h3>Chatbot</h3>
        </div>
        <div className="chatbot-body" ref={bottomRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-footer">
          <form className="chat-form" onSubmit={handleSubmit}>
            <textarea
              className="chat-form-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button className="chat-form-button" type="submit" disabled={!input.trim()}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
