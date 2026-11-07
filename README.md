# University of Swat - website redesign (competition entry)

Static website: HTML5, CSS3, JavaScript, Bootstrap 5.3 (included offline). No build step.

## Run it
The 3D gate and the assistant need a web server (a model file cannot load from file://).

    cd uos-website
    python -m http.server 8000
    # open http://localhost:8000

Or use "Live Server" in VS Code. The 3D gate needs internet once, because model-viewer 3.5.0 is loaded from the jsdelivr CDN.

## Pages
index (home) | about | admissions | departments | dcst | research (ORIC and QEC) | news | downloads | contact

## 3D gate (home page hero)
- File: `assets/models/university_of_swat_gate.glb` (animation "Rotate360_20s", 20 s loop).
- `<model-viewer>` in `index.html`: autoplay, animation-name="Rotate360_20s", camera-orbit="0deg 80deg auto", shadow-intensity="0.8",
  transparent background. No camera-controls, zoom and pan disabled, pointer events off so mobile scrolling is never blocked.
- Poster image and a "Loading 3D gate" label show until the model loads. If the CDN or WebGL fails, a still image of the gate appears.
- With "reduce motion" turned on in the system, the rotation is paused.

## UoS Assistant (chat button, bottom right)
- Works offline in the browser. It answers only from `assets/js/knowledge.js`, shows the source page, and says so when it is not sure
  (for example fee questions) instead of guessing.
- To teach it more: add an entry to `window.UOS_KB` (keys, answer, source page). Roman Urdu keywords such as "dakhla" are supported.
- Later you can swap `answer()` in `assets/js/agent.js` for a call to a PHP endpoint that uses an AI API; the chat window stays the same.

## Content you must fill (marked with [ ... ])
- Official photo of the Vice Chancellor (home) and Swat Valley photo (about).
- Vision, mission, values and objectives text (about).
- DCST: curriculum, faculty list, contact details.
- Real links for Online Services, downloads and feedback forms (they currently open the main university site).

## Notes
- Logo is cropped from the competition poster. Replace `assets/img/logo.png` with the official file if you have it.
- News, department and download titles come from the public university website pages. Verify them before submission.
- Colours: deep green #0F4D24, maroon #7A1D1D, gold #E3A91F (from the competition poster and current website).
- Accessibility: skip link, keyboard-friendly menu and tabs, visible focus, alt text, reduced-motion support.
