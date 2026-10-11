# Project Assignment Submission & Deliverables Document

**Project Title**: ITZ FIZZ — High-Fidelity Scroll-Driven Automotive Experience  
**Live Application URL**: [https://abiramiit.github.io/its-bzz/](https://abiramiit.github.io/its-bzz/)  
**GitHub Repository URL**: [https://github.com/abiramiit/its-bzz](https://github.com/abiramiit/its-bzz)  
**Production Branch**: `main` | **Deployment Branch**: `gh-pages`  

---

## 1. Executive Summary

This project delivers a scroll-driven hero section inspired by creative digital studio experiences. The application showcases an interactive, realistic 3D Ferrari vehicle traveling along a horizontal tarmac road driven entirely by scroll progress. It features an expanding light green trail, progressive letter-by-letter headline reveals, four glassmorphic statistical metrics cards, interactive Web Audio API engine sound synthesis, and momentum-based smooth scrolling powered by Lenis.

---

## 2. Assignment Objectives & Compliance Matrix

| Objective / Requirement | Implementation Details | Status |
| :--- | :--- | :--- |
| **Realistic 3D Vehicle** | Three.js GLTF Ferrari model with local Draco WebAssembly compression, metallic materials, and aerodynamic suspension pitch. | **Completed** |
| **Horizontal Travel (Left to Right)** | Pinned 2500px scroll range using GSAP ScrollTrigger (`pin: true`, `scrub: 1`, `pinSpacing: true`). | **Completed** |
| **Dynamic Green Trail** | Synchronized `#45db7d` trail growing directly behind the vehicle on the exact same interpolation frame. | **Completed** |
| **Progressive Headline Reveal** | Letter-by-letter reveal of `"WELCOME ITZFIZZ"` in high-contrast `#111` as the vehicle sweeps across character positions. | **Completed** |
| **Statistical Metrics Reveal** | 4 glassmorphic metric cards (`58%`, `23%`, `27%`, `40%`) revealing sequentially at calibrated scroll milestones. | **Completed** |
| **Bidirectional Scrubbing** | Scrolling backward smoothly reverses the car position, retracts the trail, hides letters, and fades out cards. | **Completed** |
| **Fluid, Buttery Motion** | Integrated Lenis momentum smooth scrolling synced with GSAP's high-precision ticker; eliminated `getBoundingClientRect` layout reflows from render loop. | **Completed** |
| **Audio Synthesis** | Real-time procedural engine revving and rumble via Web Audio API oscillators, modulating pitch with scroll speed. | **Completed** |
| **Production Deployment** | Built with Vite, automated GitHub Pages deployment (`base: './'`), and zero asset 404 errors. | **Live & Verified** |

---

## 3. Architecture & Technical Highlights

### A. Three.js 3D Vehicle & Zero-Reflow Render Loop
- **Model**: High-detail Ferrari GLTF vehicle loaded with `DRACOLoader` served locally from `/draco/`.
- **Zero Layout Thrashing**: Removed `getBoundingClientRect()` from `requestAnimationFrame`. Transform values are accessed directly from memory via GSAP's internal cache (`_gsap.x`), eliminating layout recalculations.
- **Physical Dynamics**: Velocity is exponentially smoothed (`lerp(smoothVelocity, targetVelocity, 0.15)`), driving realistic wheel rotation and subtle aerodynamic pitch.

### B. Lenis Inertial Momentum Scroll
- Smooths discrete mouse wheel notch jumps into continuous physical deceleration.
- Synchronized with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- Lag smoothing disabled (`gsap.ticker.lagSmoothing(0)`) to ensure strict frame sync.

### C. Lockstep Timeline Animation
- Pinned distance extended to `2500px` for nuanced, granular control.
- Vehicle translation (`tl.to(car, { x: endX })`) and trail width expansion (`tl.to(trail, { width: ... })`) are tweened simultaneously on the GPU compositor thread.

### D. Procedural Audio Engine
- Built using the Web Audio API without external audio file dependencies.
- Consists of two oscillators (sawtooth sub-bass + square overtone) routed through a low-pass biquad filter.
- Dynamic frequency and volume modulation in response to vehicle velocity, with an interactive mute/unmute toggle.

---

## 4. Technology Stack

- **Core Framework**: React 18
- **Build Tool**: Vite 6
- **3D Graphics**: Three.js (r169) with DRACOLoader
- **Animation**: GSAP 3.15 (ScrollTrigger, ScrollToPlugin)
- **Smooth Scrolling**: Lenis 1.3
- **Styling**: Tailwind CSS v4 & Vanilla CSS
- **Audio**: Web Audio API (Synthesizer Engine)
- **Hosting & CI/CD**: GitHub Actions & GitHub Pages

---

## 5. Repository File Structure

```
Itzfizz/
├── public/
│   ├── draco/               # Local Draco WebAssembly decoders
│   ├── models/              # Compressed 3D Ferrari GLTF model
│   └── vite.svg             # Application favicon
├── src/
│   ├── components/
│   │   ├── Car3D.jsx        # Three.js scene, lighting, model loader, wheel physics
│   │   ├── Hero.jsx         # Pinned scroll container, trail, letter reveal, stat cards
│   │   ├── Navbar.jsx       # Studio navigation bar
│   │   ├── About.jsx        # Company about section
│   │   ├── Services.jsx     # Capabilities & offerings
│   │   ├── Work.jsx         # Portfolio showcase
│   │   ├── Process.jsx      # Workflow timeline
│   │   ├── Impact.jsx       # Studio metrics
│   │   └── Contact.jsx      # Call to action & footer links
│   ├── utils/
│   │   └── engineAudio.js   # Web Audio API engine sound synthesizer
│   ├── App.jsx              # Main layout, Lenis initialization, audio toggle
│   ├── index.css            # Design tokens and styles
│   └── main.jsx             # React DOM entry point
├── .github/workflows/
│   └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── ASSIGNMENT_SUBMISSION.md # Assignment documentation
├── README.md                # Project documentation
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite configuration with relative base path
```

---

## 6. How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abiramiit/its-bzz.git
   cd its-bzz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```

5. **Deploy updates to GitHub Pages**:
   ```bash
   npm run deploy
   ```

---

## 7. Submission Verification

- **Live URL Check**: Verified HTTP 200 on all static bundles, Draco decoders, and GLTF models.
- **Cross-Browser Compatibility**: Validated on modern Chromium, WebKit, and Firefox browsers.
- **Scroll Test**: Verified forward scrub, reverse scrub, text un-reveal, and smooth momentum.
