/* ==========================================================================
   University of Swat — Smart AI Assistant (Easypaisa / Fintech Aesthetic)
   Author: UoS Web Redesign Team
   ========================================================================== */
(function () {
  'use strict';

  var KB = window.UOS_KB || [];
  var root = document.getElementById('uos-assistant-root');
  if (!root) return;
  var base = root.getAttribute('data-base') || '';

  // Inject UI structure
  root.innerHTML =
    '<div class="uos-fab-wrap">' +
      '<div class="uos-fab-tooltip" id="uosFabTooltip" role="tooltip">' +
        '<span class="tooltip-wave">👋</span>' +
        '<span class="tooltip-text">Assalam-o-Alaikum! <b>Ask UoS Assistant</b></span>' +
        '<button type="button" class="tooltip-close" id="uosTooltipClose" aria-label="Dismiss">&times;</button>'+
      '</div>' +
      '<button class="uos-fab" type="button" id="uosFab" aria-expanded="false" aria-controls="uosPanel" aria-label="Open UoS AI Assistant">' +
        '<span class="uos-fab-pulse"></span>' +
        '<div class="uos-fab-icon">' +
          '<svg class="ic-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' +
          '</svg>' +
          '<svg class="ic-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
          '</svg>' +
        '</div>' +
        '<span class="uos-fab-text"><span class="txt-open">UoS AI</span><span class="txt-close">Close</span></span>' +
      '</button>' +
    '</div>' +
    '<section class="uos-panel" id="uosPanel" role="dialog" aria-label="UoS Smart Virtual Assistant">' +
      '<div class="uos-head">' +
        '<div class="uos-avatar-wrap">' +
          '<img src="' + base + 'assets/img/logo.png" alt="University of Swat">' +
          '<span class="status-dot" title="Online"></span>' +
        '</div>' +
        '<div class="uos-head-info">' +
          '<b>UoS Smart Guide <span class="sparkle">✨</span></b>' +
          '<small><span class="live-dot"></span> Active Now • Instant Campus Answers</small>' +
        '</div>' +
        '<div class="uos-head-actions">' +
          '<button type="button" id="uosReset" title="Restart chat" aria-label="Restart chat">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>' +
          '</button>' +
          '<button type="button" id="uosClose" title="Close chat" aria-label="Close assistant">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="uos-body" id="uosBody" aria-live="polite"></div>' +
      '<form class="uos-form" id="uosForm">' +
        '<div class="uos-input-pill">' +
          '<span class="input-icon">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '</span>' +
          '<input id="uosInput" type="text" placeholder="Apna sawal likhen (e.g. Admission, DCST, Merit)..." autocomplete="off">' +
          '<button type="submit" id="uosSubmit" aria-label="Send message">' +
            '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
        '</div>' +
      '</form>' +
      '<div class="uos-note"><span>🔒</span> Official University of Swat Verified Records</div>' +
    '</section>';

  var fab = document.getElementById('uosFab'),
      tooltip = document.getElementById('uosFabTooltip'),
      tooltipClose = document.getElementById('uosTooltipClose'),
      panel = document.getElementById('uosPanel'),
      body = document.getElementById('uosBody'),
      form = document.getElementById('uosForm'),
      input = document.getElementById('uosInput');
  var started = false;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function getTimeStr() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return h + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm;
  }

  function cleanQuestion(text) {
    return (text || '').replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF\uFE0F\s]+/g, '').trim();
  }

  function renderWelcome() {
    body.innerHTML = '';
    var welcome = document.createElement('div');
    welcome.className = 'uos-welcome';
    welcome.innerHTML =
      '<div class="uos-welcome-icon">' +
        '<img src="' + base + 'assets/img/logo.png" alt="University of Swat">' +
      '</div>' +
      '<h3>Assalam-o-Alaikum! 👋</h3>' +
      '<p>Welcome to University of Swat! Main aapka 24/7 smart virtual guide hoon. Neechay diye gaye topics select karein ya apna sawal type karein:</p>';
    body.appendChild(welcome);

    var d = document.createElement('div');
    d.className = 'uos-chips';
    (window.UOS_SUGGEST || []).forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'uos-chip-btn';
      b.innerHTML = '<span class="chip-text">' + esc(s) + '</span>';
      b.addEventListener('click', function () {
        ask(cleanQuestion(s));
      });
      d.appendChild(b);
    });
    body.appendChild(d);
  }

  function open() {
    panel.classList.add('open');
    fab.classList.add('active');
    fab.setAttribute('aria-expanded', 'true');
    if (tooltip) tooltip.style.display = 'none';
    if (!started) {
      started = true;
      renderWelcome();
    }
    setTimeout(function () { input.focus(); }, 140);
  }

  function close() {
    panel.classList.remove('open');
    fab.classList.remove('active');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  function score(text, e) {
    var t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
    var s = 0;
    e.keys.forEach(function (k) {
      var kNorm = k.toLowerCase().trim();
      if (t.indexOf(' ' + kNorm + ' ') > -1) {
        s += kNorm.indexOf(' ') > -1 ? 4 : 2;
      }
    });
    return s;
  }

  function answer(text) {
    var best = null, bs = 0;
    KB.forEach(function (e) {
      var s = score(text, e);
      if (s > bs) { bs = s; best = e; }
    });
    return bs >= 2 ? best : null;
  }

  function appendUserMessage(text) {
    var row = document.createElement('div');
    row.className = 'uos-msg-row me';
    row.innerHTML =
      '<div class="uos-msg-col">' +
        '<div class="uos-msg me">' + esc(text) + '</div>' +
        '<span class="uos-msg-time">' + getTimeStr() + '</span>' +
      '</div>';
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }

  function appendBotMessage(html, chips) {
    var row = document.createElement('div');
    row.className = 'uos-msg-row bot';
    var chipsHtml = '';
    if (chips && chips.length) {
      chipsHtml = '<div class="uos-msg-chips">';
      chips.forEach(function (c) {
        chipsHtml += '<button type="button" class="uos-mini-chip" data-query="' + esc(cleanQuestion(c)) + '">' + esc(c) + '</button>';
      });
      chipsHtml += '</div>';
    }

    row.innerHTML =
      '<div class="uos-msg-avatar">' +
        '<img src="' + base + 'assets/img/logo.png" alt="UoS Guide">' +
      '</div>' +
      '<div class="uos-msg-col">' +
        '<div class="uos-msg bot">' + html + '</div>' +
        chipsHtml +
        '<span class="uos-msg-time">UoS Assistant • ' + getTimeStr() + '</span>' +
      '</div>';
    body.appendChild(row);

    // Attach listeners to follow-up mini chips
    row.querySelectorAll('.uos-mini-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = this.getAttribute('data-query');
        if (q) ask(q);
      });
    });

    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }

  function ask(text) {
    text = (text || '').trim();
    if (!text) return;
    appendUserMessage(text);

    // Typing indicator row
    var typingRow = document.createElement('div');
    typingRow.className = 'uos-msg-row bot typing-row';
    typingRow.innerHTML =
      '<div class="uos-msg-avatar">' +
        '<img src="' + base + 'assets/img/logo.png" alt="UoS Guide">' +
      '</div>' +
      '<div class="uos-msg-col">' +
        '<div class="uos-msg bot typing-msg">' +
          '<span class="uos-typing"><i></i><i></i><i></i></span>' +
          '<span class="typing-text">Searching university records...</span>' +
        '</div>' +
      '</div>';
    body.appendChild(typingRow);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });

    var match = answer(text);

    setTimeout(function () {
      typingRow.remove();
      if (!match) {
        appendBotMessage(
          '<div class="uos-bubble-text">' + esc(window.UOS_FALLBACK) + '</div>',
          ['Admissions Fall 2026', 'Where is DCST?', 'Contact & Offices']
        );
        return;
      }

      var html = '<div class="uos-bubble-text">' + esc(match.a) + '</div>';
      if (match.src) {
        var isExternal = match.src[1].indexOf('http') === 0;
        var href = isExternal ? match.src[1] : (base + match.src[1]);
        var target = isExternal ? ' target="_blank" rel="noopener"' : '';
        html += '<a class="uos-src" href="' + href + '"' + target + '>' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>' +
          '</svg> ' +
          '<span>Verified Source: ' + esc(match.src[0]) + '</span>' +
        '</a>';
      }

      appendBotMessage(html, match.chips || ['Admissions Fall 2026', 'Where is DCST?']);
    }, 420);
  }

  // Event handlers
  fab.addEventListener('click', function () {
    panel.classList.contains('open') ? close() : open();
  });

  document.getElementById('uosClose').addEventListener('click', close);
  document.getElementById('uosReset').addEventListener('click', function () {
    renderWelcome();
  });

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
    if (ev.key === 'Escape' && panel.classList.contains('open')) close();
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var val = input.value;
    input.value = '';
    ask(val);
  });

  // Automatically show the tooltip bubble after 2 seconds
  setTimeout(function () {
    if (!started && tooltip) {
      tooltip.classList.add('visible');
    }
  }, 1800);

  window.UosAgent = { open: open, close: close, ask: ask };
})();
