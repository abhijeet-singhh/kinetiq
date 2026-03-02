# Kinetiq UI

Motion-first React UI components built for modern apps.

---

## ✨ Features

- Smooth motion interactions
- Dark & Light mode ready
- Token-based design system
- Tailwind CSS friendly
- Fully typed (TypeScript)

---

## 📦 Installation

Using pnpm:

```bash
pnpm add kinetiq-ui
```

Using npm:

```bash
npm install kinetiq-ui
```

### ⚠ Peer Dependencies

Make sure you have:

- react >= 18
- motion >= 12

---

## 🚀 Usage

```tsx
import { GlowButton } from "kinetiq-ui";

export default function Example() {
  return <GlowButton>Click me</GlowButton>;
}
```

---

## 🎨 Tailwind Setup (Monorepo / Next.js)

If you're using Tailwind v4 in a monorepo,  
you may need:

```ts
// next.config.ts
transpilePackages: ["kinetiq-ui"];
```

and in your `globals.css`:

```css
@source "../node_modules/kinetiq-ui/src";
```

---

## 🛠 Development

```bash
pnpm build
```

---

## 📄 License

MIT
