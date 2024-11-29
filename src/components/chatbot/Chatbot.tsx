"use client";

import React, { useState, useEffect } from "react";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
        >
          💬
        </button>
      ) : (
        <div className="bg-white w-80 h-96 rounded-lg shadow-lg flex flex-col">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span>Asistente Virtual</span>
            <button
              onClick={toggleChat}
              className="text-white text-lg font-bold"
            >
              ×
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">Historial de chat...</div>
          <div className="p-2 border-t">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;