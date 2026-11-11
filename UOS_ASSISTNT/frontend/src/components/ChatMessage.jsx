import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === "user";

  const handleCopy = async () => {
    try {
      const textToCopy = `${message.title ? `${message.title}\n\n` : ""}${message.content}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="bg-[#1b4332] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] sm:max-w-[75%] shadow-sm">
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          <div className="text-[10px] sm:text-[11px] text-emerald-200/70 text-right mt-1.5 select-none font-mono">
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  }

  // Assistant message card
  return (
    <div className="flex justify-start mb-5 animate-fade-in">
      <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3.5 max-w-[94%] sm:max-w-[85%] shadow-sm border border-gray-100">
        {/* Optional Title / Topic Heading */}
        {message.title && (
          <h3 className="font-sans font-bold text-sm sm:text-base text-gray-900 mb-2 tracking-tight">
            {message.title}
          </h3>
        )}

        {/* Markdown Content */}
        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2 prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-strong:text-gray-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Bottom Card Footer: Timestamp & Copy Button */}
        <div className="flex items-center justify-between mt-3 pt-1 border-t border-gray-100 text-[11px] text-gray-400 select-none">
          <span className="font-mono">{message.timestamp}</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-gray-500 hover:text-[#1b4332] font-medium transition-colors duration-150 px-1 py-0.5 rounded hover:bg-gray-100 active:scale-95"
            title="Copy response"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold text-[10px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
