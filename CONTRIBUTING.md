# Contributing to Motion Lab

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/AskWozku/motion-lab.git
cd motion-lab
npm install
npm run dev
```

## Adding a New Background Engine

This is the most common contribution. Each engine is a self-contained React component.

1. **Create your component** in `src/components/YourBackground.tsx`. It should accept `{ config: BackgroundConfig, theme: 'light' | 'dark' }` as props.
2. **Add the type** to the `BackgroundType` union in `src/types.ts`.
3. **Add defaults** to `DEFAULT_CONFIGS` in `src/types.ts`.
4. **Register it** in `BackgroundRenderer.tsx` with a lazy import.
5. **Add sidebar controls** if your engine has custom settings.

Look at any existing engine (e.g., `ParticleBackground.tsx` or `MeshBackground.tsx`) for the pattern.

## Performance Guidelines

Every engine should target 60fps on mid-range hardware. A few rules of thumb:

- Clean up `requestAnimationFrame` in your `useEffect` return
- Clean up event listeners on unmount
- Avoid allocations inside the render loop
- Use `canvas` for anything with more than ~20 animated elements
- Test in both light and dark themes

## Pull Requests

- Fork the repo, create a branch, make your changes
- Run `npm run lint` to check for type errors
- Run `npm run build` to verify the production build succeeds
- Keep PRs focused — one engine or one fix per PR
- Write a clear description of what your PR does

## Code Style

- TypeScript strict mode
- Functional components with hooks (except ErrorBoundary)
- Tailwind CSS for all styling — no inline styles for layout
- Named exports for components

## Reporting Issues

Open an issue on GitHub with:

- What you expected to happen
- What actually happened
- Browser and OS
- Screenshot or recording if it's a visual bug

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
