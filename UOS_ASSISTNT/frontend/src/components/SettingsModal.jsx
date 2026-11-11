import React, { useEffect, useState } from "react";
import { Settings, Globe, Shield, Lock, X, ChevronRight, ChevronDown, Info } from "lucide-react";

const SETTINGS_LANGUAGES = [
  {
    code: "auto",
    primary: "Auto Detect",
    native: "خودکار",
    sub: "Automatically matches English, Roman Urdu, or Urdu"
  },
  {
    code: "en",
    primary: "English",
    native: "English",
    sub: "Official university academic language"
  },
  {
    code: "roman_urdu",
    primary: "Roman Urdu",
    native: "رومن اردو",
    sub: "Urdu written in English alphabet (Dakhila, Fees, etc.)"
  },
  {
    code: "urdu",
    primary: "اردو",
    native: "Urdu Script",
    sub: "خالص اور باوقار اردو تحریر"
  }
];

export default function SettingsModal({
  isOpen,
  onClose,
  language = "auto",
  onSelectLanguage
}) {
  const [selectedLang, setSelectedLang] = useState(language);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Sync state with prop and reset collapse
  useEffect(() => {
    setSelectedLang(language);
    setIsLanguageOpen(false);
  }, [language, isOpen]);

  // Handle ESC key
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

  const handleSelect = (code) => {
    setSelectedLang(code);
  };

  const handleApply = () => {
    onSelectLanguage(selectedLang);
    onClose();
  };

  const currentLangObj = SETTINGS_LANGUAGES.find((l) => l.code === selectedLang) || SETTINGS_LANGUAGES[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-list-title"
      onClick={onClose}
    >
      <div
        className="relative bg-[#f8f9fa] w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Settings Top Bar */}
        <div className="bg-[#143828] text-white px-5 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 id="settings-list-title" className="font-serif font-bold text-base leading-tight">
                Settings
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                Preferences & Portal Access
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="px-1 mb-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              General Settings
            </span>
          </div>

          {/* Item 1: Language Row (Options Hidden by default, click to expand) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#143828] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">
                    Language (زبان)
                  </span>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {currentLangObj.primary} ({currentLangObj.native})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  {currentLangObj.primary}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isLanguageOpen ? "rotate-180 text-emerald-800" : ""
                  }`}
                />
              </div>
            </button>

            {/* Hidden by default: Collapsible Options List */}
            {isLanguageOpen && (
              <div className="border-t border-gray-100 divide-y divide-gray-100 bg-gray-50/50 animate-fade-in">
                {SETTINGS_LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full px-4 py-3 text-left flex items-center transition-colors cursor-pointer ${
                        isSelected ? "bg-emerald-50/70" : "hover:bg-gray-100/60 active:bg-gray-100"
                      }`}
                    >
                      {/* WhatsApp Style Circular Radio */}
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-all ${
                          isSelected ? "border-[#143828]" : "border-gray-400/80"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#143828]" />
                        )}
                      </div>

                      {/* Language Title & Subtitle */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs sm:text-sm ${
                              isSelected
                                ? "font-bold text-[#143828]"
                                : "font-medium text-gray-800"
                            }`}
                          >
                            {lang.primary}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 font-serif ml-2">
                            {lang.native}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 truncate">
                          {lang.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Item 2: Admin Login (Positioned directly below Language) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#143828] flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">
                    Admin Login
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    Restricted
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  Faculty, staff & university admin access
                </p>
              </div>
            </div>

            {/* Placeholder option button */}
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold transition-colors flex-shrink-0 cursor-not-allowed border border-gray-200"
              title="Admin portal under development"
            >
              Sign In
            </button>
          </div>

          {/* Item 3: System Info */}
          <div className="pt-2 flex items-center justify-between px-2 text-[11px] text-gray-400 border-t border-gray-200/80">
            <div className="flex items-center space-x-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>University of Swat AI Assistant</span>
            </div>
            <span className="font-mono">v1.0.0</span>
          </div>
        </div>

        {/* Settings Footer */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-[#143828] hover:bg-[#1b4332] text-white text-xs sm:text-sm font-medium shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
