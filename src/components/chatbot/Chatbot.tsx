"use client";

import React, { useState } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Agregar mensaje del usuario al historial
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Enviar el mensaje al backend (API /api/chatbot)
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener la respuesta del chatbot");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Para depuración

      // Agregar respuesta del bot al historial
      const botMessage: Message = { role: "bot", content: data.reply || "No tengo una respuesta para eso." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error al contactar con el servidor del chatbot. Por favor, intenta más tarde." },
      ]);
    }

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que el formulario envíe una solicitud GET si hay un formulario padre
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón flotante para abrir/cerrar el chatbot */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Abrir chatbot"
        >
          💬
        </button>
      )}

      {/* Ventana del chatbot */}
      {isOpen && (
        <div className="bg-white w-96 h-96 rounded-lg shadow-xl flex flex-col">
          {/* Encabezado */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-semibold">Asistente Virtual</h2>
            <button
              onClick={toggleChat}
              className="text-white text-lg font-bold hover:bg-blue-700 rounded-full p-1 focus:outline-none"
              aria-label="Cerrar chatbot"
            >
              ×
            </button>
          </div>

          {/* Historial de mensajes */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && (
              <p className="text-gray-500 text-center italic">Inicia una conversación...</p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>

          {/* Input de texto */}
          <div className="p-3 border-t bg-white flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress} // Llama a la función cuando se presiona una tecla
              placeholder="Escribe un mensaje..."
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
