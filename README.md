<<<<<<< HEAD
# MikeUI — Visual UI Builder

A production-ready web-based UI builder that generates clean, scalable frontend code. Conceptually aligned with Webflow and Figma, using a component-driven architecture.

## Features

- **Drag-and-drop canvas** — build layouts visually
- **8 pre-built components** — Button, Navbar, Card, Input, Section, Text, Badge, Divider
- **Property panel** — visual controls, no raw CSS editing
- **Live preview** — accurate iframe render of generated code
- **Code generator** — exports HTML + Tailwind or React JSX
- **Project persistence** — save/load via localStorage, export JSON
- **Undo/Redo** — full history with Ctrl+Z / Ctrl+Y
- **Viewport switching** — Desktop / Tablet / Mobile simulation
- **Apple-inspired design system** — Inter font, 30px radius, soft shadows

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (customized design tokens)
- Zustand + Immer (state management)
- @dnd-kit (drag and drop)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
  components/
    ui/           # Renderable UI components (Button, Card, etc.)
    builder/      # Builder UI (Canvas, Palette, PropertyPanel, etc.)
  design-system/  # Design tokens
  generator/      # HTML + React code generators
  registry/       # Component registry + default props
  store/          # Zustand store
  types/          # TypeScript schema types
  utils/          # Helpers
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Y / Ctrl+Shift+Z | Redo |
| Escape | Deselect |

## Design System

| Token | Value |
|-------|-------|
| Font | Inter |
| Radius (default) | 30px |
| Shadow | 0 10px 30px rgba(0,0,0,0.08) |
| Primary color | #0071E3 |
| Background | #F5F5F7 |
=======
# MikeUI
MikeUI is a web-based UI builder that enables designers and developers to create responsive, production-ready interfaces for desktop, tablet, and mobile. It features drag-and-drop components, precise styling, real-time previews, templates, and an intuitive workspace for efficient, professional design workflows.
>>>>>>> b5e389554d7d353dad9867e803e2db237d631a77
