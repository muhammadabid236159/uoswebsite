import React from "react";

const SUGGESTIONS_BY_LANG = {
  auto: [
    { text: "Tell me about University of Swat.", langBadge: "EN" },
    { text: "How can I apply for admission?", langBadge: "EN" },
    { text: "University of Swat ke departments aur fees batayein.", langBadge: "Roman" },
    { text: "سوات یونیورسٹی میں داخلے کا کیا طریقہ ہے؟", langBadge: "اردو" }
  ],
  en: [
    { text: "Tell me about University of Swat.", langBadge: "Overview" },
    { text: "What departments and programs are available?", langBadge: "Programs" },
    { text: "How can I apply for online admission?", langBadge: "Admissions" },
    { text: "Tell me about the examination and grading system.", langBadge: "Exams" }
  ],
  roman_urdu: [
    { text: "University of Swat ke baray mein batayein.", langBadge: "Ta'aruf" },
    { text: "Kon konse departments aur programs available hain?", langBadge: "Programs" },
    { text: "Admission ke liye apply karne ka kya tareeqa hai?", langBadge: "Dakhila" },
    { text: "Semester aur examination system kaisa hai?", langBadge: "Imtehan" }
  ],
  urdu: [
    { text: "سوات یونیورسٹی کے بارے میں بتائیں۔", langBadge: "تعارف" },
    { text: "کون کون سے شعبہ جات اور فیکلٹیز دستیاب ہیں؟", langBadge: "شعبہ جات" },
    { text: "داخلے کے لیے آن لائن اپلائی کرنے کا کیا طریقہ ہے؟", langBadge: "داخلہ" },
    { text: "سمسٹر اور امتحانی نظام کیسا ہے؟", langBadge: "امتحانات" }
  ]
};

const SUBTITLES_BY_LANG = {
  auto: "Your intelligent university assistant.\nAsk in English, Roman Urdu, or Urdu.",
  en: "Your intelligent university assistant.\nAsk anything about University of Swat.",
  roman_urdu: "Aap ka smart university assistant.\nUniversity of Swat ke baray mein kuch bhi poochein.",
  urdu: "آپ کا ذہین یونیورسٹی اسسٹنٹ۔\nسوات یونیورسٹی کے متعلق کچھ بھی پوچھیں۔"
};

export default function WelcomeScreen({ onSelectPrompt, language = "auto" }) {
  const suggestions = SUGGESTIONS_BY_LANG[language] || SUGGESTIONS_BY_LANG.auto;
  const subtitle = SUBTITLES_BY_LANG[language] || SUBTITLES_BY_LANG.auto;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8 max-w-lg mx-auto w-full select-none">
      {/* Central University of Swat Crest */}
      <div className="relative mb-4 sm:mb-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-xl flex items-center justify-center overflow-hidden">
          <img
            src="./uos-logo.png"
            alt="University of Swat Crest"
            className="w-full h-full object-cover filter drop-shadow-md rounded-full transform transition-transform hover:scale-105 duration-200"
          />
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#143828] text-center tracking-tight mb-2">
        UOS AI Assistant
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 text-center text-xs sm:text-sm max-w-xs leading-relaxed mb-6 sm:mb-7 whitespace-pre-line">
        {subtitle}
      </p>

      {/* Suggested Prompt Cards */}
      <div className="w-full space-y-2.5 sm:space-y-3">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(item.text)}
            className="w-full bg-white hover:bg-emerald-50/40 text-left px-4 py-3 sm:py-3.5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/90 border-l-[4px] border-l-[#8b1e22] text-gray-800 text-xs sm:text-sm font-medium transition-all duration-150 hover:shadow-md hover:translate-x-0.5 active:scale-[0.99] flex items-center justify-between group"
          >
            <span
              className={`text-gray-700 group-hover:text-[#143828] font-normal sm:font-medium leading-relaxed ${
                language === "urdu" ? "text-right w-full font-serif" : ""
              }`}
            >
              {item.text}
            </span>
            {item.langBadge && (
              <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-emerald-700 ml-2 px-1.5 py-0.5 rounded bg-gray-100 group-hover:bg-emerald-100/60 flex-shrink-0 transition-colors">
                {item.langBadge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
