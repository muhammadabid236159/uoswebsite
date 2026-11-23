/* University of Swat website - page behaviour (vanilla JS) */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* sticky header glass state after scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    var toggleHeader = function () {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader, { passive: true });
  }

  /* reveal on scroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
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

  /* ambient 3D glowing particles for page heroes across all subpages */
  function initPageHeroParticles() {
    if (reduce) return;
    var heroes = document.querySelectorAll('.page-hero, .dev-page-hero');
    if (!heroes.length) return;

    heroes.forEach(function (hero) {
      var canvas = document.createElement('canvas');
      canvas.className = 'hero-ambient-canvas';
      hero.insertBefore(canvas, hero.firstChild);
      var ctx = canvas.getContext('2d');
      if (!ctx) return;

      var width = 0, height = 0;
      var particles = [];
      var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      var running = false;
      var rafId = null;

      function resize() {
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      var count = Math.min(Math.max(Math.floor((width * height) / 10000), 24), 50);
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0.35 + Math.random() * 0.65,
          r: 1.2 + Math.random() * 2.2,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.15 - Math.random() * 0.35,
          alpha: 0.2 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          gold: Math.random() > 0.45
        });
      }

      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        mouse.tx = (e.clientX - rect.left - width / 2) * 0.08;
        mouse.ty = (e.clientY - rect.top - height / 2) * 0.08;
      }, { passive: true });

      hero.addEventListener('mouseleave', function () {
        mouse.tx = 0;
        mouse.ty = 0;
      });

      function render() {
        if (!running) return;
        ctx.clearRect(0, 0, width, height);

        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        var len = particles.length;
        for (var i = 0; i < len; i++) {
          var p = particles[i];
          p.x += p.vx + mouse.x * p.z * 0.02;
          p.y += p.vy + mouse.y * p.z * 0.02;
          p.phase += 0.025;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          var pulsate = p.alpha * (0.75 + 0.25 * Math.sin(p.phase));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
          ctx.fillStyle = p.gold
            ? 'rgba(250, 204, 21, ' + pulsate + ')'
            : 'rgba(52, 211, 153, ' + pulsate + ')';
          ctx.shadowColor = p.gold ? '#facc15' : '#10b981';
          ctx.shadowBlur = 8 * p.z;
          ctx.fill();

          for (var j = i + 1; j < len; j++) {
            var p2 = particles[j];
            var dx = p.x - p2.x;
            var dy = p.y - p2.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              var lineAlpha = (1 - dist / 80) * 0.12 * Math.min(p.alpha, p2.alpha);
              ctx.strokeStyle = 'rgba(250, 204, 21, ' + lineAlpha + ')';
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
        ctx.shadowBlur = 0;
        rafId = requestAnimationFrame(render);
      }

      if ('IntersectionObserver' in window) {
        var heroObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (!running) {
                running = true;
                rafId = requestAnimationFrame(render);
              }
            } else {
              running = false;
              if (rafId) cancelAnimationFrame(rafId);
            }
          });
        }, { threshold: 0.05 });
        heroObserver.observe(hero);
      } else {
        running = true;
        render();
      }
    });
  }
  initPageHeroParticles();

  /* 3D perspective tilt on interactive cards across the website */
  function init3DCardTilt() {
    if (reduce || !window.matchMedia || !window.matchMedia('(hover: hover) and (min-width: 992px)').matches) return;
    var targets = document.querySelectorAll('.block-card, .campus-feature-card, .step-card, .step-light, .quick-card');
    targets.forEach(function (card) {
      card.classList.add('card-tilt-target');

      var rect = null;
      function updateRect() { rect = card.getBoundingClientRect(); }

      card.addEventListener('mouseenter', function () {
        updateRect();
        card.classList.remove('tilt-reset');
      });

      card.addEventListener('mousemove', function (e) {
        if (!rect) updateRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotX = ((y - cy) / cy) * -5.5;
        var rotY = ((x - cx) / cx) * 6.5;
        card.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.classList.add('tilt-reset');
        card.style.transform = '';
      });
    });
  }
  init3DCardTilt();

  /* metric rings animation on scroll */
  function initMetricRings() {
    var metricCards = document.querySelectorAll('[data-metric-card]');
    if (!metricCards.length) return;

    if ('IntersectionObserver' in window && !reduce) {
      var mo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            mo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      metricCards.forEach(function (c) { mo.observe(c); });
    } else {
      metricCards.forEach(function (c) { c.classList.add('visible'); });
    }
  }
  initMetricRings();

  /* interactive campus map */
  function initCampusMap() {
    var markers = document.querySelectorAll('.map-marker');
    var infoPanel = document.getElementById('mapInfo');
    if (!markers.length || !infoPanel) return;

    var buildingInfo = {
      'gate': {
        title: 'Main Gate',
        desc: 'The iconic grand entrance to University of Swat at Charbagh, featuring heritage architectural towers, modern security checkpoints, and sweeping mountain vistas.',
        link: 'about.html#campuses',
        linkText: 'Learn more about Main Campus'
      },
      'block-a': {
        title: 'Academic Block A (DCST Hub)',
        desc: 'Houses Computer & Software Technology (DCST), Geology, Chemistry, Media Studies, and Environmental Sciences with advanced computing labs and research facilities.',
        link: 'dcst.html',
        linkText: 'Explore DCST Department'
      },
      'block-b': {
        title: 'Academic Block B',
        desc: 'Center for Education, Management & Commerce, Islamic & Arabic Studies, Social Sciences, Law & Shariah, and Archaeology.',
        link: 'departments.html',
        linkText: 'View Block B Departments'
      },
      'block-c': {
        title: 'Academic Block C',
        desc: 'Natural & Bio-Sciences hub: Botany, Agricultural Sciences & Forestry, Biotechnology, Psychology, Mathematics & Statistics, Economics, and Zoology.',
        link: 'departments.html',
        linkText: 'View Block C Departments'
      },
      'library': {
        title: 'Central Research Library',
        desc: 'Modern university library equipped with high-speed digital cataloging, research terminals, quiet reading zones, and over 50,000 reference books and journals.',
        link: 'departments.html',
        linkText: 'Central Library Services'
      },
      'hunerkada': {
        title: 'Hunerkada (Center of Excellence)',
        desc: 'Dedicated academy celebrating Gandhara art, creative crafts, design, painting, and regional cultural preservation.',
        link: 'departments.html',
        linkText: 'Discover Hunerkada'
      },
      'allied-health': {
        title: 'Allied Health Sciences Building',
        desc: 'Features modern medical labs for Doctor of Physical Therapy (DPT), Medical Lab Technology (MLT), Dental Technology, and Humanities.',
        link: 'departments.html',
        linkText: 'Explore Allied Health Programs'
      }
    };

    markers.forEach(function (marker) {
      marker.addEventListener('click', function () {
        var id = marker.getAttribute('data-building');
        var data = buildingInfo[id];
        if (!data) return;

        markers.forEach(function (m) { m.classList.remove('active'); });
        marker.classList.add('active');

        infoPanel.innerHTML = '<h4>' + data.title + '</h4>' +
          '<p>' + data.desc + '</p>' +
          '<a href="' + data.link + '" class="btn btn-sm btn-green mt-3">' + data.linkText + '</a>';
      });
    });
  }
  initCampusMap();

  /* live feed dismiss */
  function initLiveFeed() {
    var closeBtn = document.getElementById('closeLiveFeed');
    var feed = document.getElementById('liveFeed');
    if (!closeBtn || !feed) return;
    closeBtn.addEventListener('click', function () {
      feed.style.opacity = '0';
      feed.style.transform = 'translateY(20px)';
      feed.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(function () { feed.style.display = 'none'; }, 350);
    });
  }
  initLiveFeed();
})();
