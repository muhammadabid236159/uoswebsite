import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center space-x-1.5">
        <span className="w-2 h-2 rounded-full bg-[#1b4332] typing-dot-1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-[#1b4332] typing-dot-2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-[#1b4332] typing-dot-3 inline-block" />
      </div>
    </div>
  );
}
