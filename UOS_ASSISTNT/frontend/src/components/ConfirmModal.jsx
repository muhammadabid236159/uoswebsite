import React, { useEffect } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Clear Conversation?",
  message = "Are you sure you want to delete all messages? This action cannot be undone and your conversation history will be permanently removed.",
  confirmText = "Delete Chat",
  cancelText = "Cancel"
}) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-sm sm:max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 transform transition-all duration-200 scale-100 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4 ring-8 ring-red-50/50">
            <Trash2 className="w-7 h-7 stroke-[2]" />
          </div>

          <h3
            id="modal-title"
            className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight"
          >
            {title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs sm:max-w-sm">
            {message}
          </p>
        </div>

        {/* Warning Note */}
        <div className="mt-4 bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start space-x-2.5 text-left">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-tight">
            Once deleted, this chat cannot be restored.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium text-xs sm:text-sm hover:bg-gray-50 active:scale-95 transition-all text-center"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm shadow-sm hover:shadow-red-500/20 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
