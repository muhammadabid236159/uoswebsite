import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSendMessage, disabled, placeholder = "Ask about University of Swat..." }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-[#e9eee9] border-t border-black/5 px-3 sm:px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sticky bottom-0 z-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex items-center space-x-2.5"
      >
        {/* Pill Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm rounded-full py-3 px-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-gray-200/90 focus:outline-none focus:ring-2 focus:ring-[#16a378]/60 focus:border-[#16a378] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Circular Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className="w-11 h-11 rounded-full bg-[#16a378] hover:bg-[#138e68] text-white flex items-center justify-center shadow-md transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:hover:bg-[#16a378] disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4 translate-x-0.5 -translate-y-0.5 stroke-[2.2]" />
        </button>
      </form>
    </div>
  );
}
