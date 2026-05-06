---
name: leafygreen-authoring
description: >-
  Auto-invoked when writing or editing React components (.tsx/.ts) in a project
  that has @leafygreen-ui packages in package.json. Provides component mapping,
  import conventions, design token usage, and Figma MCP auto-install workflow.
source: mongodb/leafygreen-ui/.agent-/skills
when_to_use: writing or editing React components in a LeafyGreen project
license: MongoDB
mongodb:
  team: product-ux
  owner: kelsey.marshall@mongodb.com
---

# LeafyGreen Authoring Conventions

Apply these conventions whenever writing or editing React components in a project that uses `@leafygreen-ui/*` packages.

## Always prefer LeafyGreen components over plain HTML

When a user asks to add any UI element — in plain language, from a Figma design, or anywhere else — always check if a LeafyGreen component exists for it first. Never use a plain HTML element (`<button>`, `<input>`, `<select>`, etc.) when an `@leafygreen-ui` equivalent is available.

Common mappings:

| User asks for… | Use |
|----------------|-----|
| Button, CTA | `@leafygreen-ui/button` → `Button` |
| Text input, text field | `@leafygreen-ui/text-input` → `TextInput` |
| Dropdown, select | `@leafygreen-ui/select` → `Select`, `Option` |
| Searchable dropdown | `@leafygreen-ui/combobox` → `Combobox` |
| Search box | `@leafygreen-ui/search-input` → `SearchInput` |
| Number field | `@leafygreen-ui/number-input` → `NumberInput` |
| Checkbox | `@leafygreen-ui/checkbox` → `Checkbox` |
| Radio button | `@leafygreen-ui/radio-group` → `RadioGroup`, `Radio` |
| Toggle, switch | `@leafygreen-ui/toggle` → `Toggle` |
| Icon button | `@leafygreen-ui/icon-button` → `IconButton` |
| Icon | `@leafygreen-ui/icon` → `Icon` |
| Heading, body text, label | `@leafygreen-ui/typography` → `H1`–`H3`, `Body`, `Label`, `Subtitle` |
| Modal, dialog | `@leafygreen-ui/modal` → `Modal` |
| Tooltip | `@leafygreen-ui/tooltip` → `Tooltip` |
| Tabs | `@leafygreen-ui/tabs` → `Tabs`, `Tab` |
| Table | `@leafygreen-ui/table` → `Table`, `Row`, `Cell` |
| Badge, tag, chip | `@leafygreen-ui/badge` → `Badge` |
| Banner, alert | `@leafygreen-ui/banner` → `Banner` |
| Toast, notification | `@leafygreen-ui/toast` → `Toast` |
| Menu, context menu | `@leafygreen-ui/menu` → `Menu`, `MenuItem` |
| Card | `@leafygreen-ui/card` → `Card` |
| Code block | `@leafygreen-ui/code` → `Code` |
| Logo / logomark | `@leafygreen-ui/logo` → `MongoDBLogoMark`, `MongoDBLogo` |
| Stepper, progress steps | `@leafygreen-ui/stepper` → `Stepper`, `Step` |
| Pipeline | `@leafygreen-ui/pipeline` → `Pipeline`, `Stage` |

If a package is not yet installed, install it before writing the component code:
```bash
npm install @leafygreen-ui/[package-name]
```

## Component imports

Always use **named imports** for LG components:

```tsx
import { H1, Body, Subtitle } from '@leafygreen-ui/typography'
import { Button } from '@leafygreen-ui/button'
import Icon from '@leafygreen-ui/icon'           // default import
import { MongoDBLogoMark } from '@leafygreen-ui/logo'
```

## Styling approach

Always use design tokens from `@leafygreen-ui/tokens` for colors — never hard-coded hex values. Tokens are the single source of truth for color in the design system and automatically resolve to the correct value for dark or light mode.

```tsx
import { palette } from '@leafygreen-ui/tokens'

// Correct: use a token
color: palette.gray.dark2

// Avoid: hard-coded hex
color: '#3D4F58'
```

## Figma MCP → auto-install missing packages

When implementing a design from the Figma MCP, the component descriptions include the LeafyGreen package name, e.g.:

```
⚛️ React name: @leafygreen-ui/text-input
⚛️ React name: @leafygreen-ui/select
```

**Before writing any component code:**
1. Scan all `⚛️ React name:` entries in the Figma design context
2. Cross-check each `@leafygreen-ui/*` package against `package.json`
3. Install any that are missing: `npm install @leafygreen-ui/[package-name]`
4. Never substitute plain HTML for a LeafyGreen component that is called out in the design spec

## File structure

- New components go in `src/components/[ComponentName].tsx`
- One component per file
- Name files and components in PascalCase: `ProjectCard.tsx`, not `project-card.tsx`
- Ask before creating new folders outside of `src/components/`

## TypeScript

- Always define prop types explicitly using TypeScript interfaces
- Do not use `any` as a type

## General

- Keep components focused. If a component is doing more than one thing, split it.
