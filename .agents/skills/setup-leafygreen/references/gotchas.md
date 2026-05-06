# LeafyGreen Gotchas & Fixes

Known issues encountered when working with LeafyGreen UI in Vite + React + TypeScript projects.

---

## 1. Blank page with "Invalid hook call" in console

**Symptom:** Browser shows a blank page. Console shows:
```
Warning: Invalid hook call. Hooks can only be called inside of the body of a function component.
Uncaught TypeError: Cannot read properties of null (reading 'useContext')
```

**Cause:** Multiple copies of React in the bundle. Some LeafyGreen packages bundle their own React, causing a version conflict with the project's React.

**Fix:** Add `dedupe` and `alias` to `vite.config.ts`:

```ts
import path from 'path'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
})
```

---

## 2. LeafyGreenProvider import error

**Symptom:** TypeScript error:
```
'"@leafygreen-ui/leafygreen-provider"' has no exported member named 'LeafyGreenProvider'.
Did you mean 'LeafyGreenProviderProps'?
```

**Cause:** `LeafyGreenProvider` is a **default export**, not a named export.

**Fix:**
```tsx
// ❌ Wrong
import { LeafyGreenProvider } from '@leafygreen-ui/leafygreen-provider'

// ✅ Correct
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider'
```

---

## 3. Button (and other polymorphic components) TypeScript error with React 19

**Symptom:** TypeScript build error:
```
error TS2786: 'Button' cannot be used as a JSX component.
  Its type 'InferredPolymorphicComponentType<BaseButtonProps, "button">' is not a valid JSX element type.
```

**Cause:** LeafyGreen's polymorphic component type (`InferredPolymorphicComponentType`) is incompatible with React 19's updated JSX type definitions.

**Fix:** Add `{/* @ts-ignore - React 19 polymorphic type mismatch */}` on the line immediately before the component in JSX:

```tsx
{/* @ts-ignore - React 19 polymorphic type mismatch */}
<Button variant="primary" size="large">Submit</Button>
```

This affects: `Button`, `IconButton`, and any other components that use `InferredPolymorphicComponentType`. The components render correctly at runtime — this is a type-checking-only issue.

---

## 4. MongoDBLogoMark has no `darkMode` prop

**Symptom:** TypeScript error:
```
Property 'darkMode' does not exist on type 'IntrinsicAttributes & BaseLogoProps & RefAttributes<SVGSVGElement>'
```

**Cause:** `MongoDBLogoMark` uses `BaseLogoProps` which does not include `darkMode`. Control the color with the `color` prop instead.

**Fix:**
```tsx
// ❌ Wrong
<MongoDBLogoMark height={32} darkMode={false} />

// ✅ Correct
<MongoDBLogoMark height={32} color="green-dark-2" />
```

Available `color` values: `"white"`, `"black"`, `"green-dark-2"`, `"green-base"`.

---

## 5. darkMode={true} in provider but design uses light colors

**Situation:** `LeafyGreenProvider darkMode={true}` is set in `main.tsx`, but the Figma design uses light-mode colors (white cards, dark text).

**Explanation:** Setting `darkMode={true}` on the provider makes LeafyGreen CSS variables resolve to dark-mode values. However, when building a light-mode design, always use **explicit hex color values** from the Figma design rather than relying on CSS variable resolution. The dark-mode provider setting affects the shell/chrome (nav, etc.) but the page content should use explicit colors.

**Pattern:** Pass `darkMode={false}` to individual LG components (e.g. `<Button darkMode={false}>`) that appear inside light-mode cards.

---

## 6. Vite template CSS overriding LeafyGreen styles

**Symptom:** LeafyGreen components render but colors are wrong. Fonts are incorrect. Background is white instead of the expected dark MongoDB background.

**Cause:** The Vite template's `src/index.css` sets its own `:root` CSS variables, `body` styles, and heading styles that conflict with LeafyGreen's design tokens.

**Fix:** Replace the **entire** contents of `src/index.css` with only the MongoDB font declarations and base reset (see SKILL.md Step 4). Do not keep any of the template's default CSS.

Also clear `src/App.css` — the Vite template puts styles there too.

---

## 7. vite-plugin-node-polyfills deprecation warning

**Symptom:** Vite prints a warning on startup:
```
warning: `esbuild` option was specified by "vite-plugin-node-polyfills" plugin. This option is deprecated, please use `oxc` instead.
```

**Cause:** `vite-plugin-node-polyfills` uses the `esbuild` configuration option which is deprecated in newer versions of Vite (v7+). The polyfills still work correctly despite the warning.

**Status:** Harmless. Ignore until `vite-plugin-node-polyfills` ships an update for the `oxc` option.

---

## 8. Chunk size warning on build

**Symptom:**
```
(!) Some chunks are larger than 500 kB after minification.
```

**Cause:** LeafyGreen's full component library is large. This is expected and does not affect functionality.

**Fix (optional):** Use dynamic imports to split the bundle if performance becomes a concern in production. For prototypes, ignore this warning.

---

## 9. Icon glyph names

LeafyGreen icon glyph names match the Figma component names exactly. Common ones:

| Figma name | Glyph prop value |
|------------|-----------------|
| CreditCard | `"CreditCard"` |
| Gov | `"Gov"` |
| Lock | `"Lock"` |
| ArrowLeft | `"ArrowLeft"` |
| CaretDown | `"CaretDown"` |
| ChevronDown | `"ChevronDown"` |
| ChevronUp | `"ChevronUp"` |
| Bell | `"Bell"` |
| QuestionMarkWithCircle | `"QuestionMarkWithCircle"` |
| InviteUser | `"InviteUser"` |
| Ellipsis | `"Ellipsis"` |
| Person | `"Person"` |
| Checkmark | `"Checkmark"` |
| Apps (AllProducts) | `"Apps"` |

Usage: `import Icon from '@leafygreen-ui/icon'` then `<Icon glyph="Lock" size={16} fill="#5c6c75" />`
