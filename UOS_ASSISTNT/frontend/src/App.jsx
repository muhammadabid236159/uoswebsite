import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatMessage from "./components/ChatMessage";
import TypingIndicator from "./components/TypingIndicator";
import ErrorMessage from "./components/ErrorMessage";
import ChatInput from "./components/ChatInput";
import ConfirmModal from "./components/ConfirmModal";
import SettingsModal from "./components/SettingsModal";
import { sendChatMessage } from "./services/geminiService";
const STORAGE_KEY_MESSAGES = "uos_chat_messages";
const STORAGE_KEY_CONFIG = "uos_assistant_config";
const STORAGE_KEY_LANG = "uos_assistant_lang";

const PLACEHOLDERS_BY_LANG = {
  auto: "Ask in English, Roman Urdu, or Urdu...",
  en: "Ask about University of Swat in English...",
  roman_urdu: "University of Swat ke baray mein poochein (Roman Urdu)...",
  urdu: "سوات یونیورسٹی کے متعلق پوچھیں (اردو)..."
};

function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function App() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LANG) || "auto";
    } catch {
      return "auto";
    }
  });

  const handleSelectLanguage = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, newLang);
    } catch (e) {
      console.error("Failed to save language choice", e);
    }
  };

  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      return saved
        ? JSON.parse(saved)
        : {
            apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
            modelName: "gemini-3.5-flash",
            useBackend: import.meta.env.VITE_USE_BACKEND === "true" || false,
            backendUrl: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api/chat"
          };
    } catch {
      return {
        apiKey: "",
        modelName: "gemini-3.5-flash",
        useBackend: false,
        backendUrl: "http://localhost:5000/api/chat"
      };
    }
  });

  const messagesEndRef = useRef(null);

  // Save messages to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to persist messages", e);
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive or loading begins
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
    } catch (e) {
      console.error("Failed to save config", e);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    setLastFailedMessage(null);

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      content: text.trim(),
      timestamp: getFormattedTime()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: text.trim(),
        history: newHistory,
        apiKey: config.apiKey,
        modelName: config.modelName,
        useBackend: config.useBackend,
        backendUrl: config.backendUrl,
        language: language
      });

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        title: response.title,
        content: response.content,
        sources: response.sources,
        timestamp: getFormattedTime()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Error during message dispatch:", err);
      setError(err.message || "Cannot reach the server. Check your connection and try again.");
      setLastFailedMessage(text.trim());
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
    setLastFailedMessage(null);
    try {
      localStorage.removeItem(STORAGE_KEY_MESSAGES);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearChat = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmClearChat = () => {
    handleNewChat();
    setIsDeleteModalOpen(false);
  };

  const handleCancelClearChat = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-full h-[100dvh] bg-[#dce3dd] sm:bg-[#d6ded7] flex flex-col items-center justify-center sm:p-4 text-gray-800">
      {/* Main Container: Native full-screen on Mobile, centered card on Desktop */}
      <main className="w-full h-[100dvh] sm:h-[88vh] sm:max-h-[840px] max-w-full sm:max-w-[430px] bg-[#edf1ee] flex flex-col sm:rounded-2xl sm:shadow-[0_15px_45px_rgba(0,0,0,0.18)] sm:border sm:border-black/10 overflow-hidden relative">
        {/* Header */}
        <Header
          onNewChat={handleNewChat}
          onClearChat={handleClearChat}
          hasMessages={messages.length > 0}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 flex flex-col justify-start">
          {messages.length === 0 ? (
            <WelcomeScreen
              onSelectPrompt={handleSendMessage}
              language={language}
            />
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isLoading && <TypingIndicator />}

              {error && <ErrorMessage error={error} onRetry={handleRetry} />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Field */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={PLACEHOLDERS_BY_LANG[language] || PLACEHOLDERS_BY_LANG.auto}
        />

        {/* Settings & Language Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          language={language}
          onSelectLanguage={handleSelectLanguage}
        />

        {/* Confirmation Modal for Clearing / Deleting Chat */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelClearChat}
          onConfirm={handleConfirmClearChat}
          title="Delete Conversation?"
          message="Are you sure you want to clear this chat? All messages and history will be permanently deleted."
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      </main>
    </div>
  );
}
