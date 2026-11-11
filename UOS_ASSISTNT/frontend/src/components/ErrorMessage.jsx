import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex justify-start mb-4 w-full animate-fade-in">
      <div className="bg-[#fdf0ed] text-[#8a1c14] border border-[#f5c6cb] rounded-xl px-4 py-3 w-full max-w-[94%] sm:max-w-[88%] shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-start space-x-2 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 text-[#8a1c14] mt-0.5 flex-shrink-0" />
          <p className="leading-tight">
            {error || "Cannot reach the server. Check your connection and try again."}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-1 font-bold text-xs sm:text-sm text-[#8a1c14] hover:text-[#5a100b] hover:underline px-2 py-1 rounded transition-colors duration-150 flex-shrink-0 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
}
