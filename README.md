# Scroll-Driven Hero Section Animation

A modern, cinematic frontend experience showcasing high-performance scroll-driven animations using React, GSAP, and Tailwind CSS. The main visual transforms directly based on the user's scroll position, providing an interactive and highly premium product-style feel.

## Overview
This project strictly follows best practices for frontend animations:
- Animations are based on standard CSS `transform` (scale, rotate, translate) for layout stability and 60FPS performance.
- The `Hero` section is pinned natively with GSAP ScrollTrigger to ensure a continuous and smooth scroll-linked aesthetic that scrubs both forwards and backwards instantly without jitter.
- The UI contains premium micro-interactions and dark, cinematic typography designed to mimic modern tech firm assignments.

## Features
- **GSAP ScrollTrigger**: True scroll scrubbing for fluid visual translation (no simple time-delayed autoplay animations).
- **Responsive Layout**: Designed for seamless degradation across Desktop, Tablet, and Mobile sizing.
- **Performant CSS**: Uses `@tailwindcss/vite` v4 alongside carefully scoped raw CSS for specific micro-effects like background noise or custom keyframe rings.
- **Accessibility**: Smooth semantic React scaffolding (supports future `prefers-reduced-motion` wrapping implementations).

## Tech Stack
- React.js (Vite)
- GSAP & ScrollTrigger (Animation Layer)
- Tailwind CSS (Styling Utility)
- JavaScript

## Animation Approach
- **Initial Load Timeline**: Configurable initial load via `gsap.timeline` that targets component refs with stagger parameters, ensuring elements enter synchronously when mounting is completed.
- **Scroll Sequence Timeline**: Uses `gsap.context(...)` for React 18 strict mode safety. Attached to `heroWrapperRef` enabling a `.pin()` setup across 2500px of scrolling while calculating dynamic `.to()` progress for opacity, scale, and rotations seamlessly.


## Local Setup

To quickly serve locally matching production configurations, run the following:
```bash
npm install
npm run dev
```

## Production Build

To build the static distribution folder, run:
```bash
npm run build
```

## Deployment
Automated via GitHub Actions.
Any merge into `main` executes `.github/workflows/deploy.yml`. Vite builds the distribution output relatively (`base: './'`) avoiding broken repository path URLs, followed by automatic commit extraction into GitHub Pages `gh-pages` logic.
