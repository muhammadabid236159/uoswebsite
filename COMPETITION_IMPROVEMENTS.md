# UOS Website Competition Improvements - Master Prompt

## Overview
This document contains the complete strategy to transform the University of Swat website from its current state (6.5/10) to competition-winning standard (8.5-9/10). Follow these improvements in order.

---

## Phase 1: Typography & Design System (Priority: CRITICAL)

### Task 1.1: Implement Professional Typography System

**What to do:**
Replace all default Bootstrap typography with a professional, contemporary system using Inter or IBM Plex Sans.

**Implementation:**
1. Add Google Fonts to `<head>` in all HTML files:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

2. Update base typography in `assets/css/style.css`:
```css
:root {
  /* Typography Scale */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  
  /* Font Sizes - Refined Scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Font Weights */
  --fw-normal: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  font-weight: var(--fw-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  font-weight: var(--fw-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

h1 { font-size: var(--text-5xl); font-weight: var(--fw-extrabold); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-3xl); }
h4 { font-size: var(--text-2xl); }
h5 { font-size: var(--text-xl); font-weight: var(--fw-semibold); }
h6 { font-size: var(--text-lg); font-weight: var(--fw-semibold); }

.lead, .lead-mut {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  font-weight: var(--fw-normal);
}

/* Mono for metrics, timestamps, technical labels */
.stat .n, .badge, code, .metric {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
```

**Expected Result:** Clean, professional typography that looks modern and confident, not generic Bootstrap default.

---

### Task 1.2: Implement Production-Grade Color System

**What to do:**
Replace the basic green/gold palette with a comprehensive, competition-worthy color system with proper contrast ratios and semantic tokens.

**Implementation in `assets/css/style.css`:**
```css
:root {
  /* Base Colors - Deep Production Slate/Navy */
  --slate-950: #0B0E14;
  --slate-900: #0F172A;
  --slate-800: #1E293B;
  --slate-700: #334155;
  --slate-600: #475569;
  --slate-500: #64748B;
  --slate-400: #94A3B8;
  --slate-300: #CBD5E1;
  --slate-200: #E2E8F0;
  --slate-100: #F1F5F9;
  --slate-50: #F8FAFC;
  
  /* University Brand Green - Refined */
  --green-950: #052E16;
  --green-900: #0F4D24;
  --green-800: #166534;
  --green-700: #15803D;
  --green-600: #16A34A;
  --green-500: #22C55E;
  --green-400: #4ADE80;
  --green-300: #86EFAC;
  --green-200: #BBF7D0;
  --green-100: #DCFCE7;
  
  /* Gold/Brass Accent - Warm CTA */
  --gold-950: #451A03;
  --gold-900: #78350F;
  --gold-800: #92400E;
  --gold-700: #B45309;
  --gold-600: #D97706;
  --gold-500: #F59E0B;
  --gold-400: #FBBF24;
  --gold-300: #FCD34D;
  --gold-200: #FDE68A;
  --gold-100: #FEF3C7;
  
  /* Cool Electric Accent - Interactive Elements */
  --cyan-600: #0891B2;
  --cyan-500: #06B6D4;
  --cyan-400: #22D3EE;
  --sky-500: #0EA5E9;
  --sky-400: #38BDF8;
  
  /* Semantic Tokens */
  --color-primary: var(--green-700);
  --color-primary-hover: var(--green-800);
  --color-accent: var(--gold-500);
  --color-accent-hover: var(--gold-600);
  --color-interactive: var(--sky-400);
  
  --color-bg-base: #FFFFFF;
  --color-bg-alt: var(--slate-50);
  --color-bg-elevated: #FFFFFF;
  
  --color-text-primary: var(--slate-900);
  --color-text-secondary: var(--slate-600);
  --color-text-tertiary: var(--slate-500);
  --color-text-inverse: var(--slate-50);
  
  --color-border: var(--slate-200);
  --color-border-strong: var(--slate-300);
  
  /* Shadows - Refined */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04);
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Spacing - 8px Grid System */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
}

/* Dark Mode Support (Competition Bonus Points!) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-base: var(--slate-950);
    --color-bg-alt: var(--slate-900);
    --color-bg-elevated: var(--slate-800);
    
    --color-text-primary: var(--slate-50);
    --color-text-secondary: var(--slate-300);
    --color-text-tertiary: var(--slate-400);
    --color-text-inverse: var(--slate-900);
    
    --color-border: var(--slate-800);
    --color-border-strong: var(--slate-700);
  }
}
```

**Update component styles:**
```css
.btn-green {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary);
}

.btn-green:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-gold {
  background: var(--color-accent);
  color: var(--slate-900);
  border: 1px solid var(--color-accent);
  font-weight: var(--fw-semibold);
}

.btn-gold:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.card-soft {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.card-soft:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

**Expected Result:** Professional, cohesive color system that works in light/dark modes with proper accessibility.

---

## Phase 2: Enhanced Interactive Components (Priority: HIGH)

### Task 2.1: Add Micro-Interactions & Hover Effects

**What to do:**
Add subtle, production-quality hover states and transitions throughout the site.

**Implementation:**
```css
/* Smooth transitions everywhere */
* {
  transition: color 0.15s ease, background-color 0.15s ease, 
              border-color 0.15s ease, transform 0.15s ease,
              box-shadow 0.15s ease, opacity 0.15s ease;
}

/* Link hover effects */
a:not(.btn) {
  position: relative;
  text-decoration: none;
  color: var(--color-primary);
  transition: color 0.2s ease;
}

a:not(.btn):hover {
  color: var(--color-primary-hover);
}

a:not(.btn)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

a:not(.btn):hover::after {
  width: 100%;
}

/* Card lift effect */
.block-card, .card-soft, .news-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.block-card:hover, .card-soft:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Button press effect */
.btn {
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
}

.btn:active {
  transform: translateY(1px);
}

/* Icon animations */
.icon-tile svg, .link-arrow svg {
  transition: transform 0.3s ease;
}

.card-soft:hover .icon-tile svg,
.link-arrow:hover svg {
  transform: translateX(4px);
}

/* Stat counter animation on scroll (add this JS) */
.stat .n {
  font-variant-numeric: tabular-nums;
  font-weight: var(--fw-extrabold);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--color-primary);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stat.visible .n {
  opacity: 1;
  transform: translateY(0);
}
```

**Add JavaScript for stat counter animation in `assets/js/main.js`:**
```javascript
// Animated stat counters
const stats = document.querySelectorAll('.stat');
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const counter = entry.target.querySelector('.n');
      const target = parseInt(counter.getAttribute('data-count'));
      animateCounter(counter, target);
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}
```

**Expected Result:** Site feels alive with smooth, professional interactions on every element.

---

### Task 2.2: Add Interactive Data Visualizations

**What to do:**
Replace static stat counters with an interactive dashboard-style section with progress rings and sparklines.

**Add after stats section in `index.html`:**
```html
<section class="section bg-slate-50" id="achievements">
  <div class="container">
    <div class="reveal text-center mb-5">
      <span class="eyebrow">Excellence & Impact</span>
      <h2 class="section-title">Research & Academic Achievements</h2>
      <p class="lead-mut mx-auto" style="max-width: 640px;">
        Measuring our progress in research output, student success, and community engagement
      </p>
    </div>
    
    <div class="row g-4">
      <!-- Research Publications Progress -->
      <div class="col-md-6 col-lg-3 reveal">
        <div class="metric-card">
          <div class="metric-ring" data-progress="78">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" class="metric-ring-bg"/>
              <circle cx="60" cy="60" r="54" class="metric-ring-fill" 
                      style="--progress: 78"/>
            </svg>
            <div class="metric-value">
              <span class="n">340</span>
              <small>Papers</small>
            </div>
          </div>
          <h4>Research Publications</h4>
          <p class="metric-trend">
            <span class="trend-up">↑ 24%</span> vs last year
          </p>
        </div>
      </div>
      
      <!-- Student Success Rate -->
      <div class="col-md-6 col-lg-3 reveal">
        <div class="metric-card">
          <div class="metric-ring" data-progress="92">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" class="metric-ring-bg"/>
              <circle cx="60" cy="60" r="54" class="metric-ring-fill" 
                      style="--progress: 92"/>
            </svg>
            <div class="metric-value">
              <span class="n">92%</span>
              <small>Rate</small>
            </div>
          </div>
          <h4>Graduation Rate</h4>
          <p class="metric-trend">
            <span class="trend-up">↑ 5%</span> improvement
          </p>
        </div>
      </div>
      
      <!-- Faculty with PhDs -->
      <div class="col-md-6 col-lg-3 reveal">
        <div class="metric-card">
          <div class="metric-ring" data-progress="86">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" class="metric-ring-bg"/>
              <circle cx="60" cy="60" r="54" class="metric-ring-fill" 
                      style="--progress: 86"/>
            </svg>
            <div class="metric-value">
              <span class="n">86%</span>
              <small>PhD</small>
            </div>
          </div>
          <h4>Faculty with Doctorate</h4>
          <p class="metric-trend">
            <span class="trend-stable">→</span> maintained
          </p>
        </div>
      </div>
      
      <!-- International Collaborations -->
      <div class="col-md-6 col-lg-3 reveal">
        <div class="metric-card">
          <div class="metric-ring" data-progress="65">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" class="metric-ring-bg"/>
              <circle cx="60" cy="60" r="54" class="metric-ring-fill" 
                      style="--progress: 65"/>
            </svg>
            <div class="metric-value">
              <span class="n">28</span>
              <small>MoUs</small>
            </div>
          </div>
          <h4>Global Partnerships</h4>
          <p class="metric-trend">
            <span class="trend-up">↑ 12</span> new this year
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Add CSS for metric cards:**
```css
.metric-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  transition: all 0.3s ease;
}

.metric-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.metric-ring {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-4);
}

.metric-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.metric-ring-bg {
  fill: none;
  stroke: var(--slate-200);
  stroke-width: 8;
}

.metric-ring-fill {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 339.292; /* 2 * PI * 54 */
  stroke-dashoffset: calc(339.292 * (1 - var(--progress) / 100));
  transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.metric-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.metric-value .n {
  display: block;
  font-size: var(--text-3xl);
  font-weight: var(--fw-extrabold);
  font-family: var(--font-mono);
  color: var(--color-primary);
  line-height: 1;
}

.metric-value small {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: var(--space-1);
}

.metric-card h4 {
  font-size: var(--text-lg);
  font-weight: var(--fw-semibold);
  margin: var(--space-3) 0 var(--space-2);
  color: var(--color-text-primary);
}

.metric-trend {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.trend-up {
  color: var(--green-600);
  font-weight: var(--fw-semibold);
}

.trend-down {
  color: #DC2626;
  font-weight: var(--fw-semibold);
}

.trend-stable {
  color: var(--slate-500);
}
```

**Expected Result:** Interactive, engaging data presentation that shows institutional excellence.

---

## Phase 3: Content & Storytelling Enhancement (Priority: HIGH)

### Task 3.1: Add Student Testimonials Section

**What to do:**
Add a compelling testimonials section with photos and authentic student stories.

**Add before footer in `index.html`:**
```html
<section class="section" id="testimonials">
  <div class="container">
    <div class="text-center mb-5 reveal">
      <span class="eyebrow">Student Voices</span>
      <h2 class="section-title">Life at University of Swat</h2>
      <p class="lead-mut mx-auto" style="max-width: 640px;">
        Hear from students about their journey, research, and campus experience
      </p>
    </div>
    
    <div class="row g-4">
      <div class="col-lg-4 reveal">
        <div class="testimonial-card">
          <div class="testimonial-avatar">
            <img src="assets/img/student-placeholder.jpg" alt="Student testimonial">
            <span class="testimonial-badge">CS Graduate</span>
          </div>
          <div class="testimonial-content">
            <p class="testimonial-quote">
              "The DCST faculty pushed me to think beyond coding. I landed my dream job at a tech startup in Islamabad thanks to the practical projects and research opportunities here."
            </p>
            <div class="testimonial-author">
              <strong>Ayesha Khan</strong>
              <small>BS Software Engineering, Class of 2025</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-4 reveal">
        <div class="testimonial-card">
          <div class="testimonial-avatar">
            <img src="assets/img/student-placeholder.jpg" alt="Student testimonial">
            <span class="testimonial-badge">Research Scholar</span>
          </div>
          <div class="testimonial-content">
            <p class="testimonial-quote">
              "Publishing my research paper on machine learning in my final year was a turning point. The university's research culture and facilities made it possible."
            </p>
            <div class="testimonial-author">
              <strong>Ahmad Shah</strong>
              <small>MS Computer Science, Currently at NUST</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-4 reveal">
        <div class="testimonial-card">
          <div class="testimonial-avatar">
            <img src="assets/img/student-placeholder.jpg" alt="Student testimonial">
            <span class="testimonial-badge">Tech Leader</span>
          </div>
          <div class="testimonial-content">
            <p class="testimonial-quote">
              "From organizing hackathons to leading the coding club, UoS gave me the platform to grow as a developer and a leader in Pakistan's tech community."
            </p>
            <div class="testimonial-author">
              <strong>Zainab Malik</strong>
              <small>BS Computer Science, Class of 2024</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Add CSS:**
```css
.testimonial-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 0;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.testimonial-avatar {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--green-600), var(--green-800));
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  mix-blend-mode: luminosity;
}

.testimonial-badge {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  color: var(--color-primary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.testimonial-content {
  padding: var(--space-6);
}

.testimonial-quote {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
  font-style: italic;
  margin-bottom: var(--space-5);
  position: relative;
  padding-left: var(--space-5);
}

.testimonial-quote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -8px;
  font-size: 3rem;
  color: var(--color-primary);
  opacity: 0.3;
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-author strong {
  display: block;
  font-size: var(--text-lg);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.testimonial-author small {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
```

**Expected Result:** Authentic, compelling student stories that make the university feel alive.

---

## Phase 4: Performance & Technical Excellence (Priority: MEDIUM)

### Task 4.1: Image Optimization

**What to do:**
Convert all images to WebP format and implement proper lazy loading.

**Run these commands:**
```bash
# Install image optimization tools (if needed)
npm install -g sharp-cli

# Convert all JPG/PNG to WebP
for file in assets/img/*.{jpg,png}; do
  sharp -i "$file" -o "${file%.*}.webp" --webp
done
```

**Update image tags with modern format:**
```html
<picture>
  <source srcset="assets/img/main-campus.webp" type="image/webp">
  <img src="assets/img/main-campus.jpg" alt="..." loading="lazy">
</picture>
```

**Expected Result:** 40-60% smaller image sizes, faster load times.

---

### Task 4.2: Add Accessibility Features

**What to do:**
Ensure WCAG 2.1 AA compliance for competition bonus points.

**Implementation:**
```css
/* Focus visible for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-interactive);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  font-weight: var(--fw-semibold);
  border-radius: 0 0 var(--radius-md) 0;
  z-index: 10000;
}

.skip-link:focus {
  top: 0;
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-border: var(--slate-700);
    --color-text-secondary: var(--slate-800);
  }
}
```

**Add ARIA labels where needed:**
```html
<button class="navbar-toggler" aria-label="Toggle navigation menu">
  <!-- icon -->
</button>

<nav aria-label="Main navigation">
  <!-- nav items -->
</nav>

<section aria-labelledby="achievements-heading">
  <h2 id="achievements-heading">Research & Achievements</h2>
  <!-- content -->
</section>
```

**Expected Result:** Full keyboard navigation, screen reader support, accessibility compliance.

---

## Phase 5: Unique Differentiators (Priority: COMPETITION EDGE)

### Task 5.1: Add Live Campus Activity Feed

**What to do:**
Create a dynamic "What's Happening Now" section with live updates.

**Add in sidebar or as floating widget:**
```html
<div class="live-feed-widget" id="liveFeed">
  <div class="live-feed-header">
    <span class="live-pulse"></span>
    <h5>Live @ UoS</h5>
  </div>
  <div class="live-feed-items">
    <div class="feed-item">
      <span class="feed-time">12 min ago</span>
      <p>🎓 Convocation ceremony started at Main Campus</p>
    </div>
    <div class="feed-item">
      <span class="feed-time">45 min ago</span>
      <p>📚 New research paper published by DCST faculty</p>
    </div>
    <div class="feed-item">
      <span class="feed-time">2 hours ago</span>
      <p>🏆 CS students win national hackathon</p>
    </div>
  </div>
</div>
```

**Add CSS:**
```css
.live-feed-widget {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 320px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  z-index: 999;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.5s ease 2s forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.live-feed-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--green-700), var(--green-900));
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.live-pulse {
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.4);
  }
}

.live-feed-header h5 {
  margin: 0;
  font-size: var(--text-base);
  font-weight: var(--fw-semibold);
}

.live-feed-items {
  max-height: 300px;
  overflow-y: auto;
  padding: var(--space-2);
}

.feed-item {
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.2s ease;
}

.feed-item:hover {
  background: var(--slate-50);
}

.feed-item:last-child {
  border-bottom: none;
}

.feed-time {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-1);
  font-family: var(--font-mono);
}

.feed-item p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
}
```

**Expected Result:** Dynamic, engaging widget that shows university is active and vibrant.

---

### Task 5.2: Add Interactive Campus Map

**What to do:**
Create a clickable campus map showing different blocks and facilities.

**Implementation:**
Use SVG with clickable areas or integrate Mapbox/Leaflet with custom markers.

```html
<section class="section" id="campus-map">
  <div class="container">
    <div class="text-center mb-5 reveal">
      <span class="eyebrow">Explore</span>
      <h2 class="section-title">Interactive Campus Map</h2>
      <p class="lead-mut">Click on any building to learn more</p>
    </div>
    
    <div class="campus-map-container reveal">
      <svg viewBox="0 0 1200 800" class="campus-map">
        <!-- Main Gate -->
        <g class="map-marker" data-building="gate">
          <circle cx="600" cy="650" r="40" class="marker-bg"/>
          <text x="600" y="655" class="marker-label">Main Gate</text>
        </g>
        
        <!-- Block A -->
        <g class="map-marker" data-building="block-a">
          <rect x="300" y="400" width="120" height="80" class="marker-building"/>
          <text x="360" y="445" class="marker-label">Block A</text>
        </g>
        
        <!-- Block B -->
        <g class="map-marker" data-building="block-b">
          <rect x="500" y="380" width="120" height="80" class="marker-building"/>
          <text x="560" y="425" class="marker-label">Block B</text>
        </g>
        
        <!-- Block C -->
        <g class="map-marker" data-building="block-c">
          <rect x="700" y="400" width="120" height="80" class="marker-building"/>
          <text x="760" y="445" class="marker-label">Block C</text>
        </g>
        
        <!-- Library -->
        <g class="map-marker" data-building="library">
          <rect x="500" y="200" width="140" height="100" class="marker-building"/>
          <text x="570" y="255" class="marker-label">Library</text>
        </g>
      </svg>
      
      <div class="map-info-panel" id="mapInfo">
        <h4>Select a building</h4>
        <p>Click on any location to view details</p>
      </div>
    </div>
  </div>
</section>
```

**Add CSS:**
```css
.campus-map-container {
  position: relative;
  background: var(--slate-50);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  min-height: 600px;
}

.campus-map {
  width: 100%;
  height: auto;
}

.map-marker {
  cursor: pointer;
  transition: all 0.2s ease;
}

.map-marker:hover {
  transform: scale(1.05);
}

.marker-bg {
  fill: var(--color-primary);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.map-marker:hover .marker-bg {
  opacity: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.marker-building {
  fill: var(--color-primary);
  stroke: var(--color-bg-base);
  stroke-width: 3;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.map-marker:hover .marker-building {
  opacity: 1;
  fill: var(--color-primary-hover);
}

.marker-label {
  fill: white;
  font-size: 14px;
  font-weight: var(--fw-semibold);
  text-anchor: middle;
  pointer-events: none;
}

.map-info-panel {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  width: 280px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-lg);
}

.map-info-panel h4 {
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-xl);
  color: var(--color-primary);
}

.map-info-panel p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

**Add JavaScript for interactivity:**
```javascript
document.querySelectorAll('.map-marker').forEach(marker => {
  marker.addEventListener('click', function() {
    const building = this.dataset.building;
    const infoPanel = document.getElementById('mapInfo');
    
    const buildingInfo = {
      'gate': {
        title: 'Main Gate',
        desc: 'The iconic entrance to University of Swat, featuring traditional architecture and modern security.'
      },
      'block-a': {
        title: 'Academic Block A',
        desc: 'Home to DCST, Geology, Chemistry, Media Studies, and Environmental Sciences departments.'
      },
      'block-b': {
        title: 'Academic Block B',
        desc: 'Education, Management, Islamic Studies, Social Sciences, Law, and Archaeology departments.'
      },
      'block-c': {
        title: 'Academic Block C',
        desc: 'Natural Sciences hub: Botany, Agriculture, Biotechnology, Psychology, Mathematics, Economics, Zoology.'
      },
      'library': {
        title: 'Central Library',
        desc: 'Modern research library with 50,000+ books, digital resources, and quiet study spaces.'
      }
    };
    
    const info = buildingInfo[building];
    if (info) {
      infoPanel.innerHTML = `
        <h4>${info.title}</h4>
        <p>${info.desc}</p>
        <a href="departments.html" class="btn btn-sm btn-green mt-3">Learn more</a>
      `;
    }
  });
});
```

**Expected Result:** Unique, interactive campus exploration that competitors likely won't have.

---

## Phase 6: Final Polish & Competition Checklist

### Task 6.1: Performance Optimization Checklist

**Run before submission:**

1. **Lighthouse Audit:**
```bash
# Test all pages
lighthouse https://your-site.com --view
lighthouse https://your-site.com/departments.html --view
lighthouse https://your-site.com/dcst.html --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

2. **Image Optimization:**
- All images in WebP format
- All images have proper `alt` text
- Large images lazy loaded
- Hero images preloaded

3. **Code Quality:**
```bash
# Validate HTML
npm install -g html-validator-cli
html-validator --file=index.html

# Minify CSS/JS for production
npm install -g clean-css-cli uglify-js
cleancss -o assets/css/style.min.css assets/css/style.css
uglifyjs assets/js/main.js -o assets/js/main.min.js -c -m
```

4. **Browser Testing:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

5. **Responsive Testing:**
- Mobile: 375px, 390px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

---

### Task 6.2: Final Competition Checklist

**Before Submission, Verify:**

✅ **Design System Complete**
- [ ] Professional typography (Inter/IBM Plex Sans)
- [ ] Comprehensive color system with tokens
- [ ] 8px spacing grid implemented
- [ ] Dark mode support (if required)
- [ ] Consistent component styling

✅ **Interactivity**
- [ ] Smooth hover effects on all interactive elements
- [ ] Animated stat counters
- [ ] Progress rings with data
- [ ] Micro-interactions throughout
- [ ] No lag or jank on scroll

✅ **Content Excellence**
- [ ] Student testimonials with photos
- [ ] Interactive data visualizations
- [ ] Live campus feed
- [ ] Interactive campus map
- [ ] Compelling copy throughout

✅ **Technical Excellence**
- [ ] All images optimized (WebP)
- [ ] Lazy loading implemented
- [ ] Lighthouse score 90+
- [ ] WCAG 2.1 AA compliant
- [ ] Cross-browser tested
- [ ] Mobile-responsive perfection

✅ **Unique Differentiators**
- [ ] 3D hero gate (already done ✓)
- [ ] Interactive campus map
- [ ] Live activity feed
- [ ] Data visualization dashboard
- [ ] Something competitors won't have

✅ **Documentation** (if required)
- [ ] README with tech stack
- [ ] Design system documentation
- [ ] Accessibility report
- [ ] Performance metrics
- [ ] Browser compatibility matrix

---

## Implementation Priority Order

**Day 1: Foundation (8 hours)**
1. Typography system (1.5 hours)
2. Color system & design tokens (2 hours)
3. Component styling updates (2 hours)
4. Micro-interactions & hover effects (2.5 hours)

**Day 2: Enhancements (8 hours)**
1. Interactive metrics dashboard (3 hours)
2. Student testimonials section (2 hours)
3. Image optimization (1 hour)
4. Accessibility features (2 hours)

**Day 3: Differentiators (6 hours)**
1. Interactive campus map (3 hours)
2. Live activity feed (2 hours)
3. Final polish & bug fixes (1 hour)

**Day 4: Testing & Optimization (4 hours)**
1. Cross-browser testing (1.5 hours)
2. Performance optimization (1.5 hours)
3. Final Lighthouse audit (1 hour)

---

## Expected Results

**Current State:** 6.5/10
- Basic structure ✓
- 3D hero ✓
- Responsive layout ✓
- Generic styling ✗
- Limited interactivity ✗

**After Phase 1-2:** 7.5/10
- Professional typography ✓
- Cohesive design system ✓
- Smooth interactions ✓

**After Phase 3-4:** 8.5/10
- Engaging content ✓
- Strong performance ✓
- Accessible ✓

**After Phase 5-6:** 9/10
- Unique features ✓
- Competition-ready ✓
- Polished execution ✓

---

## Quick Start Command

**To begin implementation immediately:**

```bash
# 1. Backup current state
git add . && git commit -m "Pre-competition improvements backup"

# 2. Create improvement branch
git checkout -b competition-improvements

# 3. Start with Phase 1
# Open assets/css/style.css and begin implementing typography system
```

---

## Need Help?

If you get stuck on any task:
1. Reference the specific task number
2. Check browser console for errors
3. Test incrementally (don't implement everything at once)
4. Keep original files backed up

**Remember:** Quality over quantity. It's better to implement 70% of these improvements excellently than 100% poorly.

Good luck with the competition! 🏆
