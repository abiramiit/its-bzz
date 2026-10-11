---
description: How to build and deploy the ITZ FIZZ scroll-driven application
---

# Deploying the ITZ FIZZ Web Application

This project is built with **Vite + React**. The build output is static HTML, JS, CSS, and 3D assets in the `dist/` folder. Because `vite.config.js` uses `base: './'`, it works seamlessly on any domain or subfolder.

---

## Step 1: Build the Production Bundle

Run the Vite build command:
```powershell
npm run build
```
This generates the optimized `dist/` directory containing all pre-bundled assets.

---

## Step 2: Choose Your Deployment Target

### Option A: Vercel (Fastest & Recommended)
1. Run the non-interactive Vercel CLI:
```powershell
npx vercel
```
2. Follow the prompt to log in and select project defaults:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. For subsequent production releases, deploy with:
```powershell
npx vercel --prod
```

---

### Option B: Netlify
#### Via Netlify CLI:
```powershell
npx netlify deploy --prod --dir=dist
```
#### Via Netlify Drop (No CLI needed):
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the `dist` folder from your file explorer (`e:\Itzfizz\dist`).
3. Your site goes live instantly with an SSL certificate.

---

### Option C: GitHub Pages
1. Initialize a git repository (if not already done):
```powershell
git init
git add .
git commit -m "Initial commit"
```
2. Create a repository on GitHub and link the remote:
```powershell
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```
3. Install `gh-pages`:
```powershell
npm install --save-dev gh-pages
```
4. Add the deploy script to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
5. Deploy:
```powershell
npm run deploy
```

---

### Option D: Cloudflare Pages
```powershell
npx wrangler pages deploy dist --project-name=itzfizz
```
