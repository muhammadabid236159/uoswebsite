import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt, getMockResponseByTopic } from "./universityData";

/**
 * Service to handle chat completions via:
 * 1. Custom Backend API (when user runs their backend server in the future)
 * 2. Direct Google Gemini API (client-side using API key)
 * 3. Intelligent UOS Local Knowledge Base (fallback if no API key is configured)
 */

export async function sendChatMessage({
  message,
  history = [],
  apiKey = "",
  modelName = "gemini-1.5-flash",
  useBackend = false,
  backendUrl = "http://localhost:5000/api/chat",
  language = "auto"
}) {
  // Option 1: Route to custom RAG backend folder (when active)
  if (useBackend) {
    try {
      const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || "";
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history,
          apiKey: activeKey,
          modelName: modelName || "gemini-1.5-flash",
          language
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      return {
        title: data.title || "University of Swat Assistant",
        content: data.reply || data.content || data.answer || "No response received.",
        sources: data.sources || ["UOS Backend Knowledge Base"]
      };
    } catch (err) {
      console.error("Backend API connection error:", err);
      throw new Error("Cannot reach the server. Check your connection and try again.");
    }
  }

  // Option 2: Direct Google Gemini API
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (activeKey && activeKey.trim() !== "") {
    try {
      const genAI = new GoogleGenerativeAI(activeKey.trim());
      const model = genAI.getGenerativeModel({
        model: modelName || "gemini-1.5-flash",
        systemInstruction: getSystemPrompt(language)
      });

      // Format past conversation messages for Gemini chat
      const formattedHistory = history.map(h => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.content }]
      }));

      const chat = model.startChat({
        history: formattedHistory
      });

      const result = await chat.sendMessage(message);
      const rawText = result.response.text();

      // Extract a clean title if present (e.g. ### Title or **Title**)
      let title = "University of Swat Info";
      let cleanContent = rawText;

      const titleMatch = rawText.match(/^(?:###|\*\*|##)\s*(.*?)(?:\*\*|\n)/);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].replace(/[*#]/g, "").trim();
        cleanContent = rawText.replace(titleMatch[0], "").trim();
      }

      return {
        title,
        content: cleanContent || rawText,
        sources: ["University of Swat Academic Portal", "Gemini AI Knowledge"]
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error(error.message || "Failed to generate answer from Gemini API.");
    }
  }

  // Option 3: Intelligent local fallback based on UOS Knowledge Base
  // Simulates network latency (700ms) for realistic UX
  await new Promise(resolve => setTimeout(resolve, 750));

  const lower = message.toLowerCase();

  // Detect effective language if auto
  let effectiveLang = language;
  if (language === "auto") {
    const isUrduScript = /[\u0600-\u06FF]/.test(message);
    const isRomanUrdu = lower.includes("dakhila") || lower.includes("kya") || lower.includes("kab") || lower.includes("karo") || lower.includes("hai") || lower.includes("baray") || lower.includes("batayein") || lower.includes("batao") || lower.includes("chahiye") || lower.includes("tareeqa") || lower.includes("konse");
    
    if (isUrduScript) {
      effectiveLang = "urdu";
    } else if (isRomanUrdu) {
      effectiveLang = "roman_urdu";
    } else {
      effectiveLang = "en";
    }
  }

  // Topic matching
  if (lower.includes("admission") || lower.includes("apply") || lower.includes("dakhila") || message.includes("داخلہ") || message.includes("داخلے")) {
    return getMockResponseByTopic("admission", effectiveLang);
  }
  if (lower.includes("department") || lower.includes("course") || lower.includes("program") || lower.includes("bs") || lower.includes("faculty") || message.includes("شعبہ") || message.includes("فیکلٹی")) {
    return getMockResponseByTopic("departments", effectiveLang);
  }
  if (lower.includes("exam") || lower.includes("grading") || lower.includes("gpa") || lower.includes("marks") || lower.includes("semester") || message.includes("امتحان") || message.includes("سمسٹر")) {
    return getMockResponseByTopic("examination", effectiveLang);
  }
  if (lower.includes("document") || lower.includes("certif") || lower.includes("dmc") || lower.includes("eligib") || lower.includes("asnad") || message.includes("اسناد") || message.includes("دستاویزات")) {
    return getMockResponseByTopic("documents", effectiveLang);
  }
  if (lower.includes("about") || lower.includes("swat") || lower.includes("vice chancellor") || lower.includes("campus") || lower.includes("history") || message.includes("سوات") || message.includes("تعارف")) {
    return getMockResponseByTopic("about", effectiveLang);
  }

  // Generic fallback query response according to language
  if (effectiveLang === "urdu") {
    return {
      title: "سوات یونیورسٹی کی معلومات",
      content: `**سوات یونیورسٹی** کے بارے میں معلومات پوچھنے کا شکریہ!

* داخلے، فیس اور ڈگری پروگرامز کی مزید تفصیلات کے لیے مرکزی کیمپس چارباغ، سوات تشریف لائیں یا آفیشل پورٹل [uswat.edu.pk](https://www.uswat.edu.pk) ملاحظہ کریں۔
* سوات یونیورسٹی میں سال میں دو مرتبہ (بہار اور خزاں) سمسٹرز میں داخلے منعقد ہوتے ہیں۔`,
      sources: ["سوات یونیورسٹی ہیلپ ڈیسک", "پبلک ریلیشنز آفس"]
    };
  }

  if (effectiveLang === "roman_urdu" || effectiveLang === "ur") {
    return {
      title: "University Information",
      content: `**University of Swat** ke baray mein poochne ka shukriya!

* Program aur dakhilay ki tafseelat ke liye Main Campus Charbagh, Swat tashreef layein ya [uswat.edu.pk](https://www.uswat.edu.pk) visit karein.
* Admissions Fall aur Spring semesters mein open hotay hain.
* Aap apna sawal Roman Urdu, Urdu ya English mein mazeed wazahat ke sath pooch sakte hain.`,
      sources: ["UOS Public Helpdesk", "General Inquiries Office"]
    };
  }

  return {
    title: "University Information",
    content: `Thank you for asking about **University of Swat**.

* For specific program details, please visit the official campus at Charbagh, Swat or check [uswat.edu.pk](https://www.uswat.edu.pk).
* Admissions are offered in Fall and Spring sessions across Sciences, IT, Arts, and Management.
* You can ask questions in English, Roman Urdu, or Pashto.`,
    sources: ["UOS Public Helpdesk", "General Inquiries Office"]
  };
}
