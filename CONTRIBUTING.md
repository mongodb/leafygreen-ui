# Contributing to LeafyGreen UI

Thank you for your interest in contributing to LeafyGreen UI! We appreciate contributions of all kinds—whether that's a bug fix, a new component, documentation improvements, or accessibility enhancements.

## Table of Contents

- [Can I Contribute?](#can-i-contribute)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Creating a New Component](#creating-a-new-component)
- [Testing](#testing)
- [Code Style](#code-style)
- [Accessibility](#accessibility)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Additional Resources](#additional-resources)

## Can I Contribute?

Of course! Before making a PR with a brand new component, hook, or feature, just consider the following:

- **Cross-product utility**: Can the feature be used across multiple MongoDB products?
- **Abstraction potential**: Is it abstracting logic that many developers or components could utilize?
- **Generalizability**: Have you considered how to make this as generalizable as possible?

If you're unsure whether your contribution is a good fit, feel free to reach out to the Design Systems team.

## Prerequisites

Before contributing, ensure you have these tools installed:

### Required Tools

1. **[asdf](https://asdf-vm.com/guide/getting-started.html)** - Version manager for Node.js and pnpm

   ```bash
   brew install asdf
   echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> ~/.zshrc
   ```

2. **Node.js & pnpm** - Install via asdf (see min versions in [package.json](package.json))

   ```bash
   asdf install pnpm
   asdf install nodejs
   ```

3. **Git** - For version control

### Recommended

- Code editor with TypeScript support
- ESLint and Prettier extensions for your editor

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/leafygreen-ui.git
cd leafygreen-ui

# Add the upstream remote
git remote add upstream https://github.com/mongodb/leafygreen-ui.git
```

### 2. Install Dependencies

```bash
pnpm run init
```

This installs all dependencies and links packages within the monorepo.

### 3. Start Storybook

```bash
pnpm start
```

This launches Storybook at [http://localhost:9001](http://localhost:9001) where you can view and develop components.

> **Note**: Storybook watches for changes in the main component you're viewing, but not its dependencies. If you modify a dependency package (e.g., `@leafygreen-ui/lib`), you'll need to rebuild it for changes to appear.

## Development Workflow

### Building Packages

```bash
# Build all packages
pnpm build

# Build specific packages
pnpm build --filter="@leafygreen-ui/button"
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm run test --watch

# Run tests for a specific package directory
pnpm run test packages/button

# Run a specific test file
pnpm run test ./packages/button/src/Button/Button.spec.tsx

# Run multiple test files at once
pnpm run test packages/modal/src/Modal/Modal.spec.tsx packages/modal/src/Footer/Footer.spec.tsx
```

### Linting and Formatting

```bash
# Check for linting and formatting issues
pnpm lint

# Fix all linting and formatting issues
pnpm fix
```

### Type Checking

```bash
pnpm build:tsc
```

## Creating a New Component

1. **Generate the component scaffold**

   ```bash
   pnpm create-package <package-name>
   ```

   This creates a new directory with all the boilerplate you need. Follow the naming convention: use `kebab-case` for package names (e.g., `my-new-component`). See the [create-package options](https://github.com/mongodb/leafygreen-ui/tree/main/tools/create#options) for additional flags you can use.

2. **Link packages**

   ```bash
   pnpm run init
   ```

   New packages are automatically discovered by pnpm workspaces—no manual registration required.

For details on publishing new packages, see our [Developer Guide](./DEVELOPER.md#publishing-a-new-package).

## Testing

### Unit Tests

We use [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) for component testing.

- Write tests that simulate real user interactions
- Test accessibility requirements
- Include tests for all component states and variants

### Visual Regression Testing

We use [Chromatic](https://www.chromatic.com/) for visual regression testing. When PRs are opened, Chromatic compares Storybook screenshots against the `main` branch and flags visual differences.

**Best practices:**

- Write Storybook stories that cover all visual variations of your component
- Use the `generate` parameter to automatically create stories for prop combinations:

```tsx
const meta: StoryMetaType<typeof MyComponent> = {
  // ...
  parameters: {
    generate: {
      storyNames: ['Primary', 'Secondary', 'Disabled'],
    },
  },
};
```

This ensures your component's visual states are covered by regression testing.

### Testing in External Applications

For testing components in your application before publishing, see our [Developer Guide](./DEVELOPER.md#testing-in-external-applications), which covers:

- Linking packages with `pnpm link`
- Using a local registry (Verdaccio)

## Code Style

We maintain consistent code quality through automated tooling and documented conventions.

### Automated Tools

- **Prettier** - Code formatting
- **ESLint** - Linting with accessibility rules (`eslint-plugin-jsx-a11y`)
- **TypeScript** - Static type checking

### Style Guide

For detailed coding conventions, see our [Style Guide](./STYLEGUIDE.md), which covers:

- TypeScript patterns (prefer constants over enums)
- React patterns (functional components, ref forwarding)
- Styling with Emotion
- LeafyGreen-specific patterns (darkMode, getLgIds)

### Our Stack

| Technology                                    | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/) | Type safety and better DX               |
| [Emotion](https://emotion.sh/)                | CSS-in-JS styling                       |
| [React](https://react.dev/)                   | UI components                           |
| [Storybook](https://storybook.js.org/)        | Component development and documentation |

> **Important**: Always import Emotion from `@leafygreen-ui/emotion`, not directly from the `@emotion` packages. This ensures styles are injected correctly.

```typescript
import { css, cx } from '@leafygreen-ui/emotion';
```

## Accessibility

Accessibility is a priority for LeafyGreen. We enforce standards through:

1. **eslint-plugin-jsx-a11y** - Static analysis for accessibility issues
2. **@storybook/addon-a11y** - Visual accessibility checking in Storybook

> **Note**: The Storybook addon cannot detect issues in portaled content. When working with portaled components, manually verify accessibility.

## Documentation

When contributing new components or updating existing ones, ensure documentation is updated accordingly.

### Component README & TSDoc

Each component includes a `README.md` generated from the scaffold script. We also use TSDoc comments to document props and APIs:

```typescript
/**
 * A button component that supports multiple variants and sizes.
 * @param variant - The visual style of the button
 * @param size - The size of the button
 */
```

### Storybook & mongodb.design

The [mongodb.design](https://mongodb.design) website imports your `*.stories.tsx` files to render live examples. By default, the first exported story is shown.

To specify a different default story:

```typescript
import { StoryMetaType } from '@lg-tools/storybook-utils';

const meta: StoryMetaType<typeof Component> = {
  title: 'Components/ComponentName',
  component: Component,
  parameters: {
    default: 'StoryName', // Specify which story to render
  },
};

export default meta;
```

The `StoryMetaType` utility enforces required parameters for Chromatic and mongodb.design integration.

### Excluding Interfaces from Code Docs

The mongodb.design code docs automatically import all exported interfaces. To exclude an interface, use TSDoc flags:

- `@internal` - For internal-only types
- `@noDocgen` - To force exclusion from docs

```typescript
/**
 * Internal helper type - not for public use
 * @noDocgen
 */
export interface InternalHelperProps {
  // ...
}
```

## Submitting Changes

### 1. Create a Branch

```bash
git checkout -b <descriptive-branch-name>
```

### 2. Make Your Changes

- Follow the code style guidelines
- Add or update tests as needed
- Update documentation if applicable

### 3. Add a Changeset

For any changes that should appear in a package's changelog:

```bash
pnpm changeset
```

This generates a changeset file tracking version updates. We follow [semver](https://semver.org/) conventions:

- **patch**: Bug fixes, non-breaking changes
- **minor**: New features, backwards-compatible
- **major**: Breaking changes

### 4. Commit and Push

```bash
git add .
git commit -m "feat(button): add new loading state"
git push origin <your-branch-name>
```

### 5. Open a Pull Request

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for your PR title (e.g., `feat(button): add loading state`, `fix(modal): resolve focus trap issue`)
- Provide a clear description of your changes
- Reference any relevant context
- Review should automatically be requested from `@mongodb/leafygreen-ui-maintainers`
- Ensure all CI checks pass (linting, tests, Chromatic visual regression)

The team will review your PR and may request changes.

### 6. Squash and Merge

- Once you've received approval from all maintainers who have commented, you can squash and merge your branch.
- If you do not have permission to merge, a maintainer will merge it for you.

## Additional Resources

| Resource                                      | Description                                     |
| --------------------------------------------- | ----------------------------------------------- |
| [Developer Guide](./DEVELOPER.md)             | Advanced topics: linking, Verdaccio, publishing |
| [Style Guide](./STYLEGUIDE.md)                | Detailed code style conventions                 |
| [Storybook](https://storybook.mongodb.design) | Live component documentation                    |
| [mongodb.design](https://mongodb.design)      | Design system documentation                     |

### Design Patterns

We favor:

- Functional components over class-based components
- Abstractable hooks that can be reused across components
- Named exports over default exports

---

<br />

**Thank you for contributing to LeafyGreen UI! Your efforts help improve the developer experience across MongoDB products.**
