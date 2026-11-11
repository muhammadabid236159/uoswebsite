# 🎓 University of Swat (UOS) AI Assistant - Frontend

An intelligent, modern conversational UI built with **React**, **Vite**, and **Tailwind CSS** for the **University of Swat (UOS)**, Khyber Pakhtunkhwa, Pakistan.

---

## 🌟 Key Features

- **University of Swat Branding:** Official UOS embossed crest, dark forest green university color scheme (`#143828`), and responsive typography.
- **Clean Student UI:** Streamlined interface with New Chat (`+`), Clear Conversation (`🗑️`), and zero client-side API exposure.
- **Fast Step-by-Step AI Guidance:** Automatically renders clear, numbered steps for admissions, faculties, programs, semester examination regulations, and fee inquiries.
- **100% Mobile & Webview Optimized:** Native edge-to-edge full-screen experience on mobile devices with keyboard auto-resize and touch momentum scroll.
- **Backend Ready:** Seamlessly connects to the Python FastAPI backend via `POST /api/chat`.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env
```
Default configuration:
```env
VITE_BACKEND_API_URL=http://localhost:5000/api/chat
VITE_USE_BACKEND=true
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```text
frontend/
├── public/
│   └── uos-logo.png           # Official UOS Crest Logo
├── src/
│   ├── components/
│   │   ├── Header.jsx         # App Bar, UOS Crest & Controls
│   │   ├── WelcomeScreen.jsx  # Hero Crest & 4 Suggested Prompt Cards
│   │   ├── ChatMessage.jsx    # User & Assistant Markdown Message Card
│   │   ├── ChatInput.jsx      # Pill Input & Send Action
│   │   ├── TypingIndicator.jsx# 3 Bouncing Dots Loading State
│   │   └── ErrorMessage.jsx   # Error Card with One-Click Retry
│   ├── services/
│   │   ├── geminiService.js   # API Client for Backend
│   │   └── universityData.js  # Knowledge Base & Prompts
│   ├── App.jsx                # Responsive Layout & Chat State
│   ├── index.css              # Custom Tailwind Styles & Animations
│   └── main.jsx               # React DOM Entrypoint
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 License
MIT License. Developed for University of Swat.
