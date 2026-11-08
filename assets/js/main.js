/* University of Swat website - page behaviour (vanilla JS) */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveal on scroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  /* counters */
  function format(n) { return n.toLocaleString('en-US'); }
  var counters = document.querySelectorAll('[data-count]');
  function run(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduce) { el.textContent = format(target); return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = format(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { c.textContent = '0'; co.observe(c); });
  } else { counters.forEach(function (c) { c.textContent = format(parseInt(c.getAttribute('data-count'), 10)); }); }

  /* 3D gate: loading state, fallback, reduced motion */
  var stage = document.querySelector('.hero-stage');
  if (stage) {
    var mv = stage.querySelector('model-viewer');
    var failed = false;
    function fallback() {
      if (window.UOS_GATE_MODEL && mv && mv.src !== window.UOS_GATE_MODEL) {
        mv.src = window.UOS_GATE_MODEL;
        return;
      }
      if (!failed && !stage.classList.contains('loaded')) {
        failed = true;
        stage.classList.add('no-3d');
      }
    }
    if (mv) {
      /* If opened directly in Chrome via file://, use embedded model data to bypass browser CORS block */
      if (window.UOS_GATE_MODEL && (window.location.protocol === 'file:' || !mv.src)) {
        mv.src = window.UOS_GATE_MODEL;
      }
      mv.addEventListener('load', function () {
        stage.classList.add('loaded');
        if (reduce) {
          mv.removeAttribute('auto-rotate');
        }
      });
      var btnReset = document.getElementById('btnResetCam');
      if (btnReset) {
        btnReset.addEventListener('click', function () {
          mv.cameraOrbit = '0deg 83deg 98%';
          mv.cameraTarget = '0m 0.6m 0m';
          mv.fieldOfView = '32deg';
        });
      }
      mv.addEventListener('error', fallback);
      setTimeout(function () {
        if (!window.customElements || !customElements.get('model-viewer')) fallback();
      }, 5000);
      setTimeout(fallback, 20000);
    }
  }

  /* department filter + search */
  var deptSearch = document.getElementById('deptSearch');
  var pills = document.querySelectorAll('[data-block-filter]');
  var cards = document.querySelectorAll('[data-block]');
  function applyDept() {
    var q = deptSearch ? deptSearch.value.trim().toLowerCase() : '';
    var active = document.querySelector('[data-block-filter].active');
    var block = active ? active.getAttribute('data-block-filter') : 'all';
    var shown = 0;
    cards.forEach(function (card) {
      var ok = block === 'all' || card.getAttribute('data-block') === block;
      var any = 0;
      card.querySelectorAll('li').forEach(function (li) {
        var m = !q || li.textContent.toLowerCase().indexOf(q) > -1;
        li.style.display = m ? '' : 'none';
        if (m) any++;
      });
      var vis = ok && any > 0;
      card.parentElement.style.display = vis ? '' : 'none';
      if (vis) shown++;
    });
    var none = document.getElementById('deptNone');
    if (none) none.style.display = shown ? 'none' : 'block';
  }
  pills.forEach(function (p) { p.addEventListener('click', function () { pills.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); }); p.classList.add('active'); p.setAttribute('aria-pressed', 'true'); applyDept(); }); });
  if (deptSearch) deptSearch.addEventListener('input', applyDept);

  /* downloads filter */
  var dl = document.getElementById('docSearch');
  if (dl) dl.addEventListener('input', function () {
    var q = dl.value.trim().toLowerCase(), any = 0;
    document.querySelectorAll('.doc-row').forEach(function (r) { var m = !q || r.textContent.toLowerCase().indexOf(q) > -1; r.classList.toggle('hide', !m); if (m) any++; });
    var none = document.getElementById('docNone'); if (none) none.style.display = any ? 'none' : 'block';
  });

  /* contact form (demo: validates and opens the mail app) */
  var form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = form.name.value.trim(), m = form.email.value.trim(), t = form.message.value.trim(), ok = true;
    [['name', n], ['email', /\S+@\S+\.\S+/.test(m)], ['message', t]].forEach(function (p) {
      var el = form[p[0]], good = typeof p[1] === 'string' ? p[1].length > 0 : p[1];
      el.classList.toggle('is-invalid', !good); if (!good) ok = false;
    });
    if (!ok) return;
    var body = encodeURIComponent('Name: ' + n + '\nEmail: ' + m + '\n\n' + t);
    var subject = encodeURIComponent('Website enquiry: ' + form.subject.value);
    document.getElementById('formDone').classList.remove('d-none');
    window.location.href = 'mailto:academics@uswat.edu.pk?subject=' + subject + '&body=' + body;
  });
})();
