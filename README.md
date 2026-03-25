<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
  <img src="https://img.shields.io/badge/react-19-61dafb.svg" alt="React 19" />
  <img src="https://img.shields.io/badge/engines-26-blueviolet.svg" alt="26 Engines" />
  <img src="https://img.shields.io/badge/GPU-accelerated-green.svg" alt="GPU Accelerated" />
</p>

# Motion Lab

**26 GPU-accelerated, interactive background engines for React.**

Pick an effect. Customize colors, speed, density, and behavior. Preview it live. Export the code.

**[Live Demo](https://askwozku.github.io/motion-lab/)** · Built by [Wozku](https://wozku.com).

---

## Engines

| Category | Engines |
|----------|---------|
| **Fluid** | Mesh · Glass · Beams · Blobs · Spotlight · Ripple · Pool · MetaPool · Aurora · Ribbons · Bokeh |
| **Geometric** | Bento · Topology · Minimal · Prism · Stripes · Columns · Avatars |
| **Data** | Particles · Matrix · Glitch · Circuit · Grainy · Spark · Gravity |

Every engine runs on `<canvas>` or CSS/Framer Motion, targets 60fps, and supports light/dark themes.

---

## Quick Start

```bash
git clone https://github.com/AskWozku/motion-lab.git
cd motion-lab
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start experimenting.

---

## How It Works

1. **Pick an engine** from the sidebar (26 options across 3 categories)
2. **Customize it** — adjust colors, speed, density, opacity, and type-specific settings
3. **Preview** in desktop or mobile viewport
4. **Export** — get a React component or a technical prompt to recreate the effect

---

## Tech Stack

- **React 19** + TypeScript
- **Vite 6** for builds
- **Tailwind CSS 4** for styling
- **Framer Motion** for DOM-based animations
- **HTML5 Canvas** for high-performance rendering

---

## Project Structure

```
src/
├── components/
│   ├── [26 Background Engines]     # One file per engine
│   ├── BackgroundRenderer.tsx       # Lazy-loading registry
│   ├── ErrorBoundary.tsx            # Graceful error handling
│   └── layout/                      # App shell (Header, Sidebar, Hero, Footer)
├── services/
│   └── promptService.ts             # Code & prompt export generation
├── types.ts                         # Shared types, defaults, color palettes
└── App.tsx                          # Root component
```

---

## Adding a New Engine

1. Create `src/components/YourBackground.tsx` implementing the `BackgroundConfig` interface
2. Add your type to the `BackgroundType` union in `src/types.ts`
3. Add default config to `DEFAULT_CONFIGS` in `src/types.ts`
4. Register it in `src/components/BackgroundRenderer.tsx` (lazy import + map entry)
5. Add sidebar controls in `src/components/layout/Sidebar.tsx`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) — use it however you want.
