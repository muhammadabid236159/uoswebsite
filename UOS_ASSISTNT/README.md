# 🎓 UOS AI Assistant (University of Swat)

AI Assistant ka complete **React Frontend** jo University of Swat ke liye design kiya gaya hai. Isme **Google Gemini API** integration, offline intelligent fallback, aur future **Backend (RAG/Python/Node)** ke liye ready-made connection toggle shamil hai.

---

## 📸 Mockup Design ke mutabiq Features

1. **Header:**
   - University of Swat Crest Avatar
   - "UOS AI Assistant" Title
   - Green pulsing "Online" indicator
   - **Settings (⚙️):** Gemini API Key & Backend toggle
   - **New Chat (+):** Fresh session shuru karne ke liye
   - **Clear Chat (🗑️):** History delete karne ke liye

2. **Welcome Screen:**
   - Bada University of Swat Crest
   - Title & Subtitle ("Your intelligent university assistant...")
   - **4 Quick Prompt Cards** (Deep maroon left border ke saath):
     - *"Tell me about University of Swat."*
     - *"What departments are available?"*
     - *"How can I apply for admission?"*
     - *"Tell me about the examination system."*

3. **Chat Stream:**
   - **User Bubble:** Dark Pine Green background, white text, timestamp.
   - **Assistant Card:** Clean white card, bold topic title, Markdown formatting (bullet points, bold text), dotted divider, **Sources badge (`[Source title]`)**, timestamp, aur **Copy button** (with feedback checkmark).
   - **Typing Indicator:** 3 animated bouncing dots.
   - **Error Handling:** Soft pink error card with **"Retry"** button agar network/server fail ho jaye.

4. **Input Area:**
   - Pill-shaped input with placeholder: *"Ask about University of Swat..."*
   - Circular Teal/Emerald Send Button with paper plane icon.

5. **Desktop / Mobile View:**
   - Desktop par realistic smartphone mockup frame (jaisa aapke design image main hai) with a toggle button to switch between **Mobile Mockup** and **Full Width**.

---

## 🚀 How to Run Frontend

Apne terminal main yeh command chalayein:

```bash
# 1. Frontend directory main jayein
cd frontend

# 2. Development server start karein
npm run dev
```

Server **`http://localhost:3000`** (ya Vite ke port) par start ho jayega.

---

## 🔑 Gemini API Setup (2 Aasan Tareeqe)

### Tareeqa 1: UI ke andar se (Sab se aasan)
1. App open karein.
2. Top right header par **Settings (⚙️)** icon click karein.
3. Apna Google Gemini API Key paste karein aur model select karein (e.g. `Gemini 1.5 Flash` ya `Gemini 2.0 Flash`).
4. **Save** click karein.

### Tareeqa 2: `.env` file ke zariye
`frontend/.env` file open karein aur key add karein:
```env
VITE_GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

> **Note:** Agar aapke paas abhi API Key nahi hai, tab bhi frontend **100% chalega** kyunki isme University of Swat ka built-in knowledge base (admissions, departments, exams, documents, history) shamil hai!

---

## 🔌 Future Backend Folder Setup (Jab aap backend banayenge)

Aapne farmaya ke backend ka alag folder banayenge. Jab aap backend banayein, structure aese hoga:

```text
UOS_ASSISTNT/
├── frontend/               <-- React App (ready)
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── backend/                <-- Jab aap banayein (Python FastAPI / Flask / Node)
    ├── app.py / main.py
    └── requirements.txt
```

### Backend API Contract:
Aapka backend endpoint yeh accept karega:
- **Method:** `POST /api/chat`
- **Request Body:**
  ```json
  {
    "message": "How can I apply for admission?",
    "history": []
  }
  ```
- **Response Format:**
  ```json
  {
    "title": "Admission process",
    "content": "Answer from your RAG backend appears here, rendered as markdown...",
    "sources": ["University of Swat Official Prospectus"]
  }
  ```

Jab backend run ho jaye (e.g. `http://localhost:5000`), frontend ki **Settings (⚙️)** main **"Custom Backend Mode"** toggle ON kardein!
