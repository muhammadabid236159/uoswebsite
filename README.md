# 🎓 University of Swat — Official Website & AI Assistant

A modern, responsive, and feature-rich web redesign for the **University of Swat (UoS)** featuring an **interactive 3D Campus Gate model** and a powerful **AI Campus Assistant** with an **iPhone 16 Pro Max form-factor** and an **Easypaisa-inspired floating trigger**.

---

## 🌟 Highlights & Features

### 1. 🤖 UOS AI Assistant (iPhone 16 Pro Max Form-Factor)
- **Flagship Mobile Experience:** Styled to the exact viewport dimensions (**440px × 880px**), **46px corner curves**, dark titanium bezel, authentic **Dynamic Island notch**, and iOS **Home Indicator**.
- **Easypaisa-Style Floating Widget:**
  - Premium fintech gradient capsule (`#052E16` → `#15803D`) with glowing golden borders.
  - Pulsing radar wave animation that attracts attention.
  - University Crest logo avatar with green **Live Connectivity Dot**.
  - **UOS AI ✨** branding in golden badge pill and smooth transition to "Close ×".
- **Bilingual & Multi-Language Support:**
  - Auto-Detect, English, Roman Urdu, and pure Urdu Script (اردو).
  - Contextual prompt cards with crimson-red borders (`#8B1E22`) tailored to each language.
- **Settings & Preferences Modal:**
  - Collapsible language selector with WhatsApp-style radio buttons.
  - Admin login portal gateway.
  - System information and version indicators.
- **Rich Message Cards:**
  - Formatted step-by-step guidance (**Step 1, Step 2, Step 3...**).
  - Interactive **Copy to Clipboard** button with instant feedback.
  - Direct verified source links.
  - Animated bouncing typing indicator.
- **Hybrid AI Architecture:**
  - **Live AI Mode:** Connects to the local/hosted Python FastAPI backend (`/api/chat`) running Google Gemini + Prospectus PDF RAG.
  - **Intelligent Offline Fallback:** If the backend is not running, falls back seamlessly to the built-in verified University Knowledge Base (`knowledge.js`) so the user never faces downtime.

---

### 2. 🏛️ Interactive 3D Campus Gate
- 3D glTF/GLB model of the iconic University of Swat entrance gate (`assets/models/university_of_swat_gate.glb`).
- Smooth 360° auto-rotation powered by Google `<model-viewer>`.
- Responsive fallback for low-spec devices or systems with reduced motion enabled.

---

### 3. 🎨 Design System & Color Palette
The website and assistant share a unified, authoritative university color scheme:

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Forest Pine Green (`--g`)** | `#143828` | Primary brand color, headers, buttons |
| **Dark Pine Base (`--gd`)** | `#052E16` | Topbar, site footer, widget base |
| **Rich Green (`--g2`)** | `#1B4332` | Chat user bubble, secondary buttons |
| **Soft Mint Canvas (`--gl`)** | `#EDF1EE` | Assistant body canvas, card backgrounds |
| **Shining Gold (`--gold`)** | `#FACC15` | AI badge pill, highlights, footer headings |
| **University Crimson (`--m`)**| `#8B1E22` | Prompt card left borders, badges |
| **Charcoal Ink (`--ink`)** | `#111827` | Primary body typography |
| **Emerald Glow (`--emerald`)** | `#10B981` | Online status dot, active accents |

---

## 📂 Project Structure

```text
uos-website/
├── index.html                 # Main Homepage with 3D Gate & AI Assistant
├── about.html                 # About University, Campuses & Leadership
├── admissions.html            # Admissions Portal, Criteria & Eligibility
├── departments.html           # Faculties, Academic Blocks & Institutes
├── dcst.html                  # Dept. of Computer & Software Technology
├── research.html              # ORIC, QEC & Research Publications
├── news.html                  # News, Announcements, Events & Tenders
├── downloads.html             # Application forms, syllabi & regulations
├── contact.html               # Administration, Directory & Campus map
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css  # Bootstrap 5.3 Framework
│   │   └── style.css          # Design system, iPhone 16 Pro Max panel & Easypaisa FAB
│   ├── js/
│   │   ├── agent.js           # AI Assistant Controller, DOM renderer & API dispatcher
│   │   ├── knowledge.js       # Offline verified campus knowledge base
│   │   ├── gate-model.js      # 3D Model viewer script
│   │   └── main.js            # Global navigation & interactive handlers
│   ├── img/
│   │   ├── logo.png           # Official University Crest
│   │   ├── uos-logo.png       # Circular high-res crest for AI Assistant
│   │   └── vc.jpg             # Vice Chancellor portrait
│   └── models/
│       └── university_of_swat_gate.glb # 3D Campus Gate model
│
├── assistant/                 # Production standalone build of React Assistant
│   ├── index.html
│   └── assets/
│
└── UOS_ASSISTNT/              # AI Assistant Source & Python RAG Backend
    ├── frontend/              # React + Vite source code & Tailwind styling
    └── backend/               # FastAPI + Gemini API + PDF Prospectus Loader (Local)
```

---

## 🚀 How to Run the Project

### 1. View the Website (Frontend)
Because the 3D model and scripts require a local HTTP origin, run any static web server:

**Using Python:**
```bash
# Inside the uos-website directory
python -m http.server 8000
```
Open **`http://localhost:8000`** in your browser.

**Using VS Code:**
- Install the **Live Server** extension.
- Right-click `index.html` and click **"Open with Live Server"**.

**Using Node.js:**
```bash
npx serve .
```

---

### 2. Run the AI Backend (Optional for Live Gemini AI & Prospectus RAG)
The assistant works offline automatically. To enable real-time Gemini AI and step-by-step prospectus answers:

1. Open your terminal in the backend directory:
   ```bash
   cd UOS_ASSISTNT/backend
   ```
2. Start the server:
   ```bash
   python run.py
   ```
   *(Or double-click `run.bat` on Windows)*.
3. The backend starts at **`http://localhost:5000`**:
   - **Health Check:** `http://localhost:5000/api/health`
   - **Chat API Endpoint:** `POST http://localhost:5000/api/chat`
   - **Interactive API Docs:** `http://localhost:5000/docs`

---

## 📱 AI Assistant Interactions & Keyboard Shortcuts

- **Click Floating Widget:** Opens or closes the iPhone 16 Pro Max Assistant.
- **`Escape` Key:** Closes the assistant or dismisses open modals.
- **Top Header Actions:**
  - ⚙️ **Settings:** Change assistant language or view admin gateway.
  - ➕ **New Chat:** Clears the current dialogue and displays the welcome screen.
  - 🗑️ **Trash:** Shows a confirmation modal to delete conversation history.
  - ✕ **Close:** Minimizes the assistant.
- **Copy Response:** Click the **Copy** icon at the bottom of any assistant response to copy formatted text to your clipboard.

---

## 🏛️ University Information & Verified Sources
All content, academic structures, and announcements reflect official University of Swat records:
- **Main Campus:** Charbagh, Swat, Khyber Pakhtunkhwa, Pakistan.
- **Official Portal:** [https://www.uswat.edu.pk](https://www.uswat.edu.pk)
- **Admissions Portal:** [https://admissions.uswat.edu.pk](https://admissions.uswat.edu.pk)

---

## 📄 License
Designed and developed for the **University of Swat Web Redesign Initiative**. All rights reserved.
