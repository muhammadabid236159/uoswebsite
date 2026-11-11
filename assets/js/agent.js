/* ==========================================================================
   University of Swat — Smart AI Assistant (Exact React UI & Crest Logo)
   ========================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('uos-assistant-root');
  if (!root) return;
  var base = root.getAttribute('data-base') || '';

  var BACKEND_URL = 'http://localhost:5000/api/chat';
  var STORAGE_MSGS = 'uos_chat_messages';
  var STORAGE_CONFIG = 'uos_assistant_config';
  var STORAGE_LANG = 'uos_assistant_lang';

  var language = localStorage.getItem(STORAGE_LANG) || 'auto';
  var config = {
    apiKey: '',
    modelName: 'gemini-1.5-flash',
    useBackend: true,
    backendUrl: BACKEND_URL
  };
  try {
    var savedCfg = localStorage.getItem(STORAGE_CONFIG);
    if (savedCfg) Object.assign(config, JSON.parse(savedCfg));
  } catch (e) {}

  var messages = [];
  try {
    var savedMsgs = localStorage.getItem(STORAGE_MSGS);
    if (savedMsgs) messages = JSON.parse(savedMsgs);
  } catch (e) {}

  var logoSrc = base + 'assets/img/uos-logo.png';

  // Build the complete React-identical UI structure
  root.innerHTML =
    '<div class="uos-fab-wrap">' +
      '<div class="uos-fab-tooltip" id="uosFabTooltip" role="tooltip">' +
        '<span class="tooltip-wave">👋</span>' +
        '<span class="tooltip-text">Assalam-o-Alaikum! <b>Ask UOS AI</b></span>' +
        '<button type="button" class="tooltip-close" id="uosTooltipClose" aria-label="Dismiss">&times;</button>'+
      '</div>' +
      '<button class="uos-fab" type="button" id="uosFab" aria-expanded="false" aria-controls="uosPanel" aria-label="Open UOS AI Assistant">' +
        '<span class="uos-fab-pulse"></span>' +
        '<div class="uos-ep-avatar">' +
          '<img src="' + logoSrc + '" alt="UOS AI">' +
          '<span class="uos-ep-online-dot"></span>' +
        '</div>' +
        '<div class="uos-ep-content">' +
          '<div class="uos-ep-text-open">' +
            '<span class="uos-ep-brand">UOS</span>' +
            '<span class="uos-ep-ai-pill">AI <span class="uos-ep-sparkle">✨</span></span>' +
          '</div>' +
          '<div class="uos-ep-text-close">' +
            '<span>Close</span>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</div>' +
          '<div class="uos-ep-sub">Smart Guide</div>' +
        '</div>' +
      '</button>' +
    '</div>' +

    '<section class="uos-panel" id="uosPanel" role="dialog" aria-label="UoS Smart Virtual Assistant">' +
      '<!-- iPhone 16 Pro Max Dynamic Island -->' +
      '<div class="uos-iphone-notch">' +
        '<div class="uos-dynamic-island"><span class="di-camera"></span></div>' +
      '</div>' +

      '<!-- Exact Header.jsx -->' +
      '<header class="uos-react-header">' +
        '<div class="uos-react-header-left">' +
          '<div class="uos-react-crest-wrap">' +
            '<img src="' + logoSrc + '" alt="University of Swat Crest">' +
          '</div>' +
          '<div class="uos-react-header-titles">' +
            '<h1>UOS AI Assistant</h1>' +
            '<div class="uos-react-status">' +
              '<span class="pulse-dot"></span>' +
              '<span>Online</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="uos-react-actions">' +
          '<button type="button" class="uos-react-btn" id="uosBtnSettings" title="Settings & Language" aria-label="Settings">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>' +
          '</button>' +
          '<button type="button" class="uos-react-btn" id="uosBtnNewChat" title="New Chat" aria-label="New Chat">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '</button>' +
          '<button type="button" class="uos-react-btn btn-trash" id="uosBtnClearChat" title="Delete Conversation" aria-label="Delete Conversation">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>' +
          '</button>' +
          '<button type="button" class="uos-react-btn" id="uosBtnCloseModal" title="Close Assistant" aria-label="Close Assistant">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</header>' +

      '<!-- Content Body -->' +
      '<div class="uos-react-body" id="uosReactBody" aria-live="polite"></div>' +

      '<!-- Exact ChatInput.jsx -->' +
      '<form class="uos-react-footer" id="uosReactForm">' +
        '<div class="uos-react-input-wrap">' +
          '<input type="text" id="uosReactInput" placeholder="Ask about University of Swat..." autocomplete="off">' +
        '</div>' +
        '<button type="submit" class="uos-react-send-btn" id="uosReactSubmit" aria-label="Send message">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
        '</button>' +
      '</form>' +

      '<!-- iPhone 16 Pro Max Home Indicator -->' +
      '<div class="uos-iphone-home-bar">' +
        '<div class="home-indicator"></div>' +
      '</div>' +

      '<!-- Modals Container -->' +
      '<div id="uosModalsSlot"></div>' +
    '</section>';

  var fab = document.getElementById('uosFab'),
      tooltip = document.getElementById('uosFabTooltip'),
      tooltipClose = document.getElementById('uosTooltipClose'),
      panel = document.getElementById('uosPanel'),
      body = document.getElementById('uosReactBody'),
      form = document.getElementById('uosReactForm'),
      input = document.getElementById('uosReactInput'),
      modalsSlot = document.getElementById('uosModalsSlot');

  var started = false;

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function getFormattedTime() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
  }

  function formatMarkdown(text) {
    if (!text) return '';
    var s = esc(text);
    s = s.replace(/^(?:###|##)\s*(.+)$/gm, '<h3 class="uos-card-title">$1</h3>');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/^\s*[\*\-]\s+(.+)$/gm, '<div style="padding:2px 0;">• $1</div>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#1b4332;font-weight:600;text-decoration:underline;">$1 ↗</a>');
    s = s.replace(/\n\n+/g, '<div style="height:6px;"></div>');
    s = s.replace(/\n/g, '<br>');
    return s;
  }

  var SUGGESTIONS_BY_LANG = {
    auto: [
      { text: "Tell me about University of Swat.", badge: "EN" },
      { text: "How can I apply for admission?", badge: "EN" },
      { text: "University of Swat ke departments aur fees batayein.", badge: "Roman" },
      { text: "سوات یونیورسٹی میں داخلے کا کیا طریقہ ہے؟", badge: "اردو" }
    ],
    en: [
      { text: "Tell me about University of Swat.", badge: "Overview" },
      { text: "What departments and programs are available?", badge: "Programs" },
      { text: "How can I apply for online admission?", badge: "Admissions" },
      { text: "Tell me about the examination and grading system.", badge: "Exams" }
    ],
    roman_urdu: [
      { text: "University of Swat ke baray mein batayein.", badge: "Ta'aruf" },
      { text: "Kon konse departments aur programs available hain?", badge: "Programs" },
      { text: "Admission ke liye apply karne ka kya tareeqa hai?", badge: "Dakhila" },
      { text: "Semester aur examination system kaisa hai?", badge: "Imtehan" }
    ],
    urdu: [
      { text: "سوات یونیورسٹی کے بارے میں بتائیں۔", badge: "تعارف" },
      { text: "کون کون سے شعبہ جات اور فیکلٹیز دستیاب ہیں؟", badge: "شعبہ جات" },
      { text: "داخلے کے لیے آن لائن اپلائی کرنے کا کیا طریقہ ہے؟", badge: "داخلہ" },
      { text: "سمسٹر اور امتحانی نظام کیسا ہے؟", badge: "امتحانات" }
    ]
  };

  var SUBTITLES_BY_LANG = {
    auto: "Your intelligent university assistant.\nAsk in English, Roman Urdu, or Urdu.",
    en: "Your intelligent university assistant.\nAsk anything about University of Swat.",
    roman_urdu: "Aap ka smart university assistant.\nUniversity of Swat ke baray mein kuch bhi poochein.",
    urdu: "آپ کا ذہین یونیورسٹی اسسٹنٹ۔\nسوات یونیورسٹی کے متعلق کچھ بھی پوچھیں۔"
  };

  function renderWelcome() {
    body.innerHTML = '';
    var promptsList = SUGGESTIONS_BY_LANG[language] || SUGGESTIONS_BY_LANG.auto;
    var subText = SUBTITLES_BY_LANG[language] || SUBTITLES_BY_LANG.auto;

    var wrap = document.createElement('div');
    wrap.className = 'uos-react-welcome';
    wrap.innerHTML =
      '<div class="uos-react-welcome-crest">' +
        '<img src="' + logoSrc + '" alt="University of Swat">' +
      '</div>' +
      '<h2>UOS AI Assistant</h2>' +
      '<p>' + esc(subText) + '</p>' +
      '<div class="uos-react-prompts" id="uosPromptsContainer"></div>';
    body.appendChild(wrap);

    var container = wrap.querySelector('#uosPromptsContainer');
    promptsList.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'uos-prompt-card';
      btn.innerHTML =
        '<span style="font-size:12.5px;' + (language === 'urdu' ? 'font-family:serif;text-align:right;' : '') + '">' + esc(item.text) + '</span>' +
        '<span class="badge">' + esc(item.badge) + '</span>';
      btn.addEventListener('click', function () {
        handleSendMessage(item.text);
      });
      container.appendChild(btn);
    });
  }

  function renderMessages() {
    body.innerHTML = '';
    if (!messages || messages.length === 0) {
      renderWelcome();
      return;
    }

    messages.forEach(function (msg) {
      if (msg.sender === 'user') {
        appendUserMessageUI(msg.content, msg.timestamp);
      } else {
        appendBotMessageUI(msg.title, msg.content, msg.timestamp);
      }
    });
  }

  function appendUserMessageUI(text, time) {
    var row = document.createElement('div');
    row.className = 'uos-row-me';
    row.innerHTML =
      '<div class="uos-bubble-me">' +
        '<div>' + esc(text) + '</div>' +
        '<div class="uos-time-me">' + esc(time || getFormattedTime()) + '</div>' +
      '</div>';
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }

  function appendBotMessageUI(title, content, time) {
    var row = document.createElement('div');
    row.className = 'uos-row-bot';

    var titleHtml = title ? '<h3 class="uos-card-title">' + esc(title) + '</h3>' : '';
    var formattedHtml = formatMarkdown(content);
    var fullRawText = (title ? (title + '\n\n') : '') + content;

    row.innerHTML =
      '<div class="uos-card-bot">' +
        titleHtml +
        '<div>' + formattedHtml + '</div>' +
        '<div class="uos-card-footer">' +
          '<span style="font-family:monospace;">' + esc(time || getFormattedTime()) + '</span>' +
          '<button type="button" class="uos-copy-btn">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
            '<span>Copy</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    body.appendChild(row);

    var copyBtn = row.querySelector('.uos-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(fullRawText).then(function () {
          copyBtn.classList.add('copied');
          copyBtn.innerHTML =
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' +
            '<span>Copied!</span>';
          setTimeout(function () {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML =
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
              '<span>Copy</span>';
          }, 2000);
        });
      });
    }

    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }

  function showTypingIndicator() {
    var row = document.createElement('div');
    row.className = 'uos-row-bot uos-typing-row';
    row.innerHTML =
      '<div class="uos-typing-card">' +
        '<div class="uos-typing-dots"><i></i><i></i><i></i></div>' +
        '<span style="font-size:11.5px;color:#6b7280;margin-left:4px;">UOS Assistant is thinking...</span>' +
      '</div>';
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    return row;
  }

  function handleSendMessage(text) {
    text = (text || '').trim();
    if (!text) return;

    var time = getFormattedTime();
    var userMsg = { sender: 'user', content: text, timestamp: time };
    messages.push(userMsg);
    try { localStorage.setItem(STORAGE_MSGS, JSON.stringify(messages)); } catch (e) {}

    appendUserMessageUI(text, time);
    var typingEl = showTypingIndicator();

    // Call Python Backend at http://localhost:5000/api/chat
    var historyPayload = messages.slice(-6).map(function (m) {
      return { sender: m.sender, content: m.content };
    });

    fetch(config.backendUrl || BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: historyPayload,
        apiKey: config.apiKey || ''
      })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (typingEl) typingEl.remove();
      var botTitle = data.title || 'University Information';
      var botContent = data.content || data.reply || data.answer || 'Response received.';
      var botMsg = { sender: 'assistant', title: botTitle, content: botContent, timestamp: getFormattedTime() };
      messages.push(botMsg);
      try { localStorage.setItem(STORAGE_MSGS, JSON.stringify(messages)); } catch (e) {}

      appendBotMessageUI(botTitle, botContent, botMsg.timestamp);
    })
    .catch(function (err) {
      console.warn('Backend unavailable, using local intelligence:', err);
      if (typingEl) typingEl.remove();

      // Intelligent Fallback from knowledge.js
      var KB = window.UOS_KB || [];
      var t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
      var best = null, bs = 0;
      KB.forEach(function (e) {
        var s = 0;
        e.keys.forEach(function (k) {
          var kn = k.toLowerCase().trim();
          if (t.indexOf(' ' + kn + ' ') > -1) s += kn.indexOf(' ') > -1 ? 4 : 2;
        });
        if (s > bs) { bs = s; best = e; }
      });

      var title = best ? 'University of Swat' : 'Information';
      var answer = best ? best.a : (window.UOS_FALLBACK || 'Welcome! Please check admissions and program guidelines at University of Swat.');
      if (best && best.src) {
        answer += '\n\n[' + best.src[0] + '](' + (best.src[1].indexOf('http') === 0 ? best.src[1] : (base + best.src[1])) + ')';
      }

      var botMsg = { sender: 'assistant', title: title, content: answer, timestamp: getFormattedTime() };
      messages.push(botMsg);
      try { localStorage.setItem(STORAGE_MSGS, JSON.stringify(messages)); } catch (e) {}

      appendBotMessageUI(title, answer, botMsg.timestamp);
    });
  }

  // Modals
  function openConfirmClear() {
    modalsSlot.innerHTML =
      '<div class="uos-modal-backdrop" id="uosModalBackdrop">' +
        '<div class="uos-modal-box">' +
          '<h3 style="font-size:1rem;font-weight:700;color:#111827;margin:0 0 6px 0;">Delete Conversation?</h3>' +
          '<p style="font-size:12px;color:#6b7280;margin:0 0 16px 0;line-height:1.45;">Are you sure you want to clear this chat? All messages and history will be permanently deleted.</p>' +
          '<div style="display:flex;justify-content:flex-end;gap:8px;">' +
            '<button type="button" id="uosBtnCancelClear" style="background:#f3f4f6;border:0;color:#374151;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">Cancel</button>' +
            '<button type="button" id="uosBtnConfirmClear" style="background:#e11d48;border:0;color:#fff;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">Yes, Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('uosBtnCancelClear').onclick = function () { modalsSlot.innerHTML = ''; };
    document.getElementById('uosBtnConfirmClear').onclick = function () {
      messages = [];
      try { localStorage.removeItem(STORAGE_MSGS); } catch (e) {}
      modalsSlot.innerHTML = '';
      renderWelcome();
    };
  }

  var SETTINGS_LANGUAGES = [
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

  var PLACEHOLDERS_BY_LANG = {
    auto: "Ask in English, Roman Urdu, or Urdu...",
    en: "Ask about University of Swat in English...",
    roman_urdu: "University of Swat ke baray mein poochein (Roman Urdu)...",
    urdu: "سوات یونیورسٹی کے متعلق پوچھیں (اردو)..."
  };

  function updateInputPlaceholder() {
    if (input) {
      input.placeholder = PLACEHOLDERS_BY_LANG[language] || PLACEHOLDERS_BY_LANG.auto;
    }
  }

  function openSettings() {
    var tempSelectedLang = language;
    var isLangOpen = false;

    function renderModalContent() {
      var currentLangObj = SETTINGS_LANGUAGES.find(function (l) { return l.code === tempSelectedLang; }) || SETTINGS_LANGUAGES[0];

      var optionsHtml = '';
      SETTINGS_LANGUAGES.forEach(function (lang) {
        var isSel = tempSelectedLang === lang.code;
        optionsHtml +=
          '<button type="button" class="uos-lang-opt-btn' + (isSel ? ' active' : '') + '" data-code="' + lang.code + '">' +
            '<div class="uos-radio-circle">' +
              (isSel ? '<div class="uos-radio-dot"></div>' : '') +
            '</div>' +
            '<div style="flex:1;min-width:0;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;">' +
                '<span style="font-size:12.5px;' + (isSel ? 'font-weight:700;color:#143828;' : 'font-weight:500;color:#1f2937;') + '">' + esc(lang.primary) + '</span>' +
                '<span style="font-size:12px;font-weight:600;color:#6b7280;font-family:serif;">' + esc(lang.native) + '</span>' +
              '</div>' +
              '<div style="font-size:10.5px;color:#6b7280;margin-top:2px;">' + esc(lang.sub) + '</div>' +
            '</div>' +
          '</button>';
      });

      modalsSlot.innerHTML =
        '<div class="uos-modal-backdrop" id="uosModalBackdrop">' +
          '<div class="uos-settings-box">' +
            '<!-- Header -->' +
            '<div class="uos-settings-head">' +
              '<div class="uos-settings-head-left">' +
                '<div class="uos-settings-icon-wrap">' +
                  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="2.2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>' +
                '</div>' +
                '<div>' +
                  '<h3>Settings</h3>' +
                  '<p>Preferences & Portal Access</p>' +
                '</div>' +
              '</div>' +
              '<button type="button" class="uos-settings-close-btn" id="uosBtnCloseSettings" aria-label="Close Settings">&times;</button>' +
            '</div>' +

            '<!-- Body -->' +
            '<div class="uos-settings-body">' +
              '<div class="uos-settings-section-title">GENERAL SETTINGS</div>' +

              '<!-- Item 1: Language Row -->' +
              '<div class="uos-settings-card" id="uosSettingsLangCard">' +
                '<button type="button" class="uos-settings-row-btn" id="uosToggleLangBtn">' +
                  '<div class="uos-row-left">' +
                    '<div class="uos-row-icon-wrap">' +
                      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143828" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
                    '</div>' +
                    '<div style="min-width:0;">' +
                      '<div class="uos-row-title">Language (زبان)</div>' +
                      '<div class="uos-row-sub">' + esc(currentLangObj.primary) + ' (' + esc(currentLangObj.native) + ')</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="uos-row-right">' +
                    '<span class="uos-lang-pill">' + esc(currentLangObj.primary) + '</span>' +
                    '<svg class="uos-chevron' + (isLangOpen ? ' open' : '') + '" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>' +
                  '</div>' +
                '</button>' +
                '<div class="uos-lang-options" id="uosLangOptions" style="display:' + (isLangOpen ? 'block' : 'none') + ';">' +
                  optionsHtml +
                '</div>' +
              '</div>' +

              '<!-- Item 2: Admin Login -->' +
              '<div class="uos-settings-card uos-admin-card">' +
                '<div class="uos-row-left">' +
                  '<div class="uos-row-icon-wrap">' +
                    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#143828" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
                  '</div>' +
                  '<div style="min-width:0;">' +
                    '<div style="display:flex;align-items:center;gap:6px;">' +
                      '<span class="uos-row-title">Admin Login</span>' +
                      '<span class="uos-restricted-badge">Restricted</span>' +
                    '</div>' +
                    '<div class="uos-row-sub">Faculty, staff & university admin access</div>' +
                  '</div>' +
                '</div>' +
                '<button type="button" class="uos-admin-sign-btn" title="Admin portal under development">Sign In</button>' +
              '</div>' +

              '<!-- Item 3: System Info -->' +
              '<div class="uos-settings-system-info">' +
                '<div style="display:flex;align-items:center;gap:6px;">' +
                  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
                  '<span>University of Swat AI Assistant</span>' +
                '</div>' +
                '<span style="font-family:monospace;">v1.0.0</span>' +
              '</div>' +
            '</div>' +

            '<!-- Footer -->' +
            '<div class="uos-settings-foot">' +
              '<button type="button" class="uos-btn-cancel" id="uosBtnCancelSettings">Cancel</button>' +
              '<button type="button" class="uos-btn-apply" id="uosBtnApplySettings">Save Changes</button>' +
            '</div>' +
          '</div>' +
        '</div>';

      // Event listeners
      document.getElementById('uosBtnCloseSettings').onclick = function () { modalsSlot.innerHTML = ''; };
      document.getElementById('uosBtnCancelSettings').onclick = function () { modalsSlot.innerHTML = ''; };

      document.getElementById('uosToggleLangBtn').onclick = function () {
        isLangOpen = !isLangOpen;
        renderModalContent();
      };

      var optionBtns = modalsSlot.querySelectorAll('.uos-lang-opt-btn');
      optionBtns.forEach(function (btn) {
        btn.onclick = function () {
          tempSelectedLang = this.getAttribute('data-code');
          renderModalContent();
        };
      });

      document.getElementById('uosBtnApplySettings').onclick = function () {
        language = tempSelectedLang;
        try { localStorage.setItem(STORAGE_LANG, language); } catch (e) {}
        updateInputPlaceholder();
        modalsSlot.innerHTML = '';
        if (!messages || messages.length === 0) {
          renderWelcome();
        }
      };
    }

    renderModalContent();
  }

  function open() {
    panel.classList.add('open');
    fab.classList.add('active');
    fab.setAttribute('aria-expanded', 'true');
    if (tooltip) tooltip.style.display = 'none';
    if (!started) {
      started = true;
      renderMessages();
    }
    setTimeout(function () { input.focus(); }, 140);
  }

  function close() {
    panel.classList.remove('open');
    fab.classList.remove('active');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  // Event handlers
  fab.addEventListener('click', function () {
    panel.classList.contains('open') ? close() : open();
  });

  document.getElementById('uosBtnCloseModal').addEventListener('click', close);
  document.getElementById('uosBtnNewChat').addEventListener('click', function () {
    messages = [];
    try { localStorage.removeItem(STORAGE_MSGS); } catch (e) {}
    renderWelcome();
  });
  document.getElementById('uosBtnClearChat').addEventListener('click', openConfirmClear);
  document.getElementById('uosBtnSettings').addEventListener('click', openSettings);

  if (tooltip) {
    tooltip.addEventListener('click', function (ev) {
      if (ev.target && ev.target.id === 'uosTooltipClose') return;
      open();
    });
  }

  if (tooltipClose) {
    tooltipClose.addEventListener('click', function (ev) {
      ev.stopPropagation();
      tooltip.style.display = 'none';
    });
  }

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      if (modalsSlot.innerHTML) {
        modalsSlot.innerHTML = '';
      } else if (panel.classList.contains('open')) {
        close();
      }
    }
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var val = input.value;
    input.value = '';
    handleSendMessage(val);
  });

  setTimeout(function () {
    if (!started && tooltip) {
      tooltip.classList.add('visible');
    }
  }, 1800);

  window.UosAgent = { open: open, close: close, ask: handleSendMessage };
})();
