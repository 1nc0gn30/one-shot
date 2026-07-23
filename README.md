# one-shot

The definitive directory of high-precision prompts for modern AI tools and Codex. Tactical Minimalist aesthetic for high-precision results

## Overview
The definitive directory of high-precision prompts for modern AI tools and Codex. Tactical Minimalist aesthetic for high-precision results

## Tech Stack
- React
- Vite
- Express
- Netlify (deployed)

## Project Structure
```
one-shot/
  - public
  - src
  (27 files total)
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
git clone https://github.com/1nc0gn30/one-shot.git
cd one-shot
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Available Scripts
  npm run dev - vite --port=3000 --host=0.0.0.0
  npm run build - vite build
  npm run preview - vite preview
  npm run clean - rm -rf dist
  npm run lint - tsc --noEmit

## Original README
<details>
<summary>Click to expand original README</summary>

# ONE SHOT

Prompt library and browsing UI for curated high-precision prompt collections.

## What this project is
- Searchable prompt directory with card and modal interactions.
- Designed for fast browsing, filtering, and copy workflows.
- Strong visual hierarchy with minimal, high-contrast styling.

## Tech stack
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4

## Local development
```bash
npm install
npm run dev
```

## Environment
Copy `.env.example` to `.env.local` and set:
- `GEMINI_API_KEY` only when AI-backed interactions are enabled.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run clean`

## Deployment
Build and deploy the `dist/` folder.

</details>

## TODO / Roadmap
- [ ] Add unit tests
- [ ] Add LICENSE file
- [ ] Add Dockerfile for containerized deployment
- [ ] Consider adding Tailwind CSS
- [ ] Add CI/CD pipeline
- [ ] Add contribution guidelines (CONTRIBUTING.md)
- [ ] Improve error handling and edge cases
- [ ] Add environment variable documentation
- [ ] Update dependencies to latest versions
- [ ] Add code comments and inline documentation

## Deployment
This project is deployed on Netlify. See netlify.toml for configuration.

## Author
**Neal Frazier** - [@AshAmplifies](https://github.com/1nc0gn30)

## Links
- GitHub: https://github.com/1nc0gn30/one-shot

---
*This README was enhanced as part of the neals-projects-2026 batch update.*
