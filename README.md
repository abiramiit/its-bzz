# ITZ FIZZ — Scroll-Driven Automotive Hero Experience

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20GitHub%20Pages-brightgreen)](https://abiramiit.github.io/its-bzz/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/abiramiit/its-bzz)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r169-black?logo=threedotjs)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=black)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-black)](https://lenis.darkroom.engineering/)

A modern, cinematic frontend experience showcasing high-performance scroll-driven animations using React, Three.js, GSAP ScrollTrigger, Lenis smooth scrolling, and Tailwind CSS. The 3D vehicle transforms directly based on user scroll position with an expanding tarmac trail and progressive content reveals.

---

## 🚀 Live Demo & Links
- **Live Demo**: [https://abiramiit.github.io/its-bzz/](https://abiramiit.github.io/its-bzz/)
- **Repository**: [https://github.com/abiramiit/its-bzz](https://github.com/abiramiit/its-bzz)
- **Assignment Report**: [ASSIGNMENT_SUBMISSION.md](./ASSIGNMENT_SUBMISSION.md)

---

## ✨ Features
- **Realistic 3D Ferrari**: Rendered in Three.js with Draco WebAssembly decompression and physical wheel rotation.
- **Pinned Horizontal Drive**: Pinned GSAP ScrollTrigger container across 2500px of scrolling for fine-grained control.
- **Dynamic Green Trail**: Light green (`#45db7d`) tarmac trail synchronized in lockstep behind the car.
- **Letter-by-Letter Reveal**: Progressive headline reveal as the vehicle moves across character positions.
- **Glassmorphic Metric Cards**: 4 statistics cards that trigger progressively during scroll progression.
- **Lenis Smooth Momentum**: Fluid inertial scrolling linked to GSAP's high-precision ticker with zero layout reflows.
- **Web Audio Engine Synthesizer**: Procedural engine audio synthesis responding dynamically to vehicle speed.
- **Bidirectional Scrubbing**: Instant reverse playback when scrolling upward.

---

## 🛠️ Tech Stack
- **Framework**: React 18 (Vite)
- **3D Engine**: Three.js + DRACOLoader
- **Animation**: GSAP (ScrollTrigger & ScrollToPlugin)
- **Smooth Scrolling**: Lenis
- **Styling**: Tailwind CSS & Vanilla CSS
- **Audio**: Web Audio API (Synthesizer Engine)
- **Deployment**: GitHub Pages (via GitHub Actions / `gh-pages`)

---

## 💻 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/abiramiit/its-bzz.git
cd its-bzz

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 📦 Production Build & Deploy

```bash
# Build production bundle
npm run build

# Deploy to GitHub Pages
npm run deploy
```
