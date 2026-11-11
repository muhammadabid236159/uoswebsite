import React from "react";
import { Plus, Trash2, Settings, X } from "lucide-react";

export default function Header({
  onNewChat,
  onClearChat,
  hasMessages,
  onOpenSettings
}) {
  return (
    <header className="bg-[#143828] text-white px-3 sm:px-4 py-3 flex items-center justify-between shadow-md select-none sticky top-0 z-20">
      {/* Left: Logo, Title & Status */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white/10 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0">
          <img
            src="./uos-logo.png"
            alt="University of Swat Crest"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-wide text-white leading-tight">
            UOS AI Assistant
          </h1>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot inline-block shadow-[0_0_6px_#34d399]" />
            <span className="text-[10px] sm:text-[11px] font-medium text-emerald-300 tracking-wide">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-1 sm:space-x-1.5">
        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="Settings & Language"
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors duration-150 active:scale-95 cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          title="New Chat"
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors duration-150 active:scale-95 cursor-pointer"
          aria-label="New Chat"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        {/* Delete / Clear Chat Button */}
        <button
          onClick={onClearChat}
          title="Delete Conversation"
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-rose-300 transition-colors duration-150 active:scale-95 cursor-pointer"
          aria-label="Delete Conversation"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Close Modal Button */}
        <button
          onClick={() => {
            if (typeof window !== "undefined" && window.parent) {
              window.parent.postMessage({ type: "UOS_CLOSE" }, "*");
            }
          }}
          title="Close Assistant"
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors duration-150 active:scale-95 cursor-pointer"
          aria-label="Close Assistant"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
}
