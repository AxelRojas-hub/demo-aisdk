"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

import {
  ChatInput,
  MessagesList
} from "@/components";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat"
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage = {
    id: 'initial',
    role: 'assistant' as const,
    content: '¡Hola! Soy un chatbot entrenado para hablar sobre el perfil profesional y académico de Axel Rojas. ¿En qué puedo ayudarte hoy?'
  };

  const allMessages = messages.length === 0 ? [initialMessage] : [initialMessage, ...messages];

  const isLoading = status === 'streaming' || status === 'submitted';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <div className="h-[100dvh] bg-black text-white">
      <div className="h-full p-4 mx-auto w-[90%] max-w-[1280px] flex flex-col justify-center items-center">
        <div className="h-[75vh] mb-4 w-full">
          <MessagesList
            messages={allMessages}
            isLoading={isLoading}
            ref={messagesEndRef}
          />
        </div>

        <div className="flex-shrink-0 w-full max-w-[1280px]">
          <ChatInput
            input={input}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
          />
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">
              Este proyecto es una demo y utiliza la versión gratuita de la IA de Google (Gemini), por lo que podría no estar disponible en algunos momentos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
