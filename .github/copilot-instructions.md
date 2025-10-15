# LeafyGreen UI - Copilot Instructions

This document provides comprehensive guidance for coding agents working on the LeafyGreen UI design system repository. Following these instructions will minimize build failures, validation errors, and rejected pull requests.

## Repository Overview

LeafyGreen UI is MongoDB's React component library and design system consisting of:

- **100+ workspace packages** across 4 scopes: `@leafygreen-ui`, `@lg-charts`, `@lg-chat`, and `@lg-tools`
- **Languages/Frameworks**: TypeScript, React 18, Emotion (CSS-in-JS), Storybook
- **Build System**: Turbo monorepo with pnpm workspaces

### Project Structure

```
leafygreen-ui/
├── packages/        # @leafygreen-ui core components (button, modal, etc.)
├── charts/          # @lg-charts data visualization components
├── chat/            # @lg-chat conversational UI components
├── tools/           # @lg-tools build system, CLI, linting, etc.
├── stories/         # Storybook files unrelated to a specific component
└── scripts/         # Repository maintenance scripts
```

## Build System & Development Commands

### Required Environment

Refer to `package.json` for the required Node and pnpm versions.

MUST use pnpm, not npm or yarn

### Development Workflow & Commands

Follow this workflow for all development tasks:

1. **Initial Setup** (required after clone or when switching branches):

   ```bash
   pnpm run init  # Installs dependencies and builds all packages
   ```

   - ALWAYS run this before any development work

2. **Making Changes**:

   - Edit component files in `src/`
   - Add/update tests in `.spec.tsx` files
   - Update stories in `.stories.tsx` files

3. **Development Commands**:

   ```bash
   # Build all packages (uses Turbo, typically 6-10 seconds with cache)
   pnpm build

   # Start Storybook for development
   pnpm start          # Starts on port 9001

   # Run tests
   pnpm test                              # All tests
   pnpm run test --filter="@leafygreen-ui/*"  # Specific scope

   # Linting
   pnpm lint           # Check only
   pnpm run fix        # Auto-fix issues
   ```

4. **Before Committing**:

   ```bash
   pnpm build          # Ensure builds pass
   pnpm lint           # Check for issues
   pnpm test           # Run test suite
   pnpm changeset      # Document changes for release
   ```

   - **CRITICAL**: Always use `pnpm run fix` instead of manual formatting fixes
   - Runs ESLint, Prettier, and npmPkgJsonLint

5. **PR Submission**:
   - All checks must pass in CI
   - Include meaningful test coverage
   - Update documentation as needed

### Package-Level Commands

Each package supports these scripts (defined in individual `package.json`):

```json
{
  "scripts": {
    "build": "lg-build bundle",
    "tsc": "lg-build tsc",
    "docs": "lg-build docs"
  }
}
```

## Validation Pipeline

The CI/CD system runs validations on every PR

For regular PRs, refer to `.github/workflows/pr.yml`

### PR Requirements

Refer to `.github/pull_request_template.md` for PR requirements

## Package Development Guidelines

### Creating New Components

```bash
pnpm create-package my-new-component
```

This scaffolds:

- Package structure with TypeScript configs
- Test setup with Jest/React Testing Library
- Storybook stories
- Build configuration

### Package Structure

Each package follows this structure:

```
packages/component-name/
├── src/
│   ├── Component/
│   │   ├── Component.tsx
│   │   ├── Component.styles.ts
│   │   ├── Component.spec.tsx
│   │   └── index.ts
│   ├── Component.stories.tsx
│   ├── index.ts
│   └── types.ts
├── package.json
├── README.md
└── CHANGELOG.md
```

### Workspace Dependencies

- Use `workspace:^` for internal dependencies (Example: `"@leafygreen-ui/palette": "workspace:^"`)
- External dependencies use specific versions with caret `^` version notation.
- External dependencies in `@lg-tools/*` packages use explicit dependency versions (with no caret `^` or tilde `~`)

### TypeScript Configuration

- Extends `@lg-tools/build/config/package.tsconfig.json`
- Path mapping configured in root `tsconfig.json`:
  ```json
  {
    "paths": {
      "@leafygreen-ui/*": ["packages/*/src"],
      "@lg-charts/*": ["charts/*/src"],
      "@lg-chat/*": ["chat/*/src"],
      "@lg-tools/*": ["tools/*/src"],
      "@lg-templates/*": ["templates/*/src"]
    }
  }
  ```

## File Locations & Configurations

### Key Configuration Files

- `eslint.config.mjs` - Linting rules (extends `@lg-tools/lint`)
- `prettier.config.js` - Code formatting (extends `@lg-tools/lint`)
- `turbo.json` - Build orchestration
- `tsconfig.json` - TypeScript path mapping and compilation
- `.github/workflows/` - CI/CD pipeline definitions

### Build Tools

- **Main CLI**: `@lg-tools/cli` provides `lg` command
- **Build System**: `@lg-tools/build` provides `lg-build` commands
- **Validation**: `@lg-tools/validate` checks dependencies and structure
- **Testing**: `@lg-tools/test` provides Jest configuration

## Performance Notes

- **Build caching**: Turbo extensively caches builds - clean cache if issues arise
- **Icon package**: Has special build caching due to SVG generation complexity
- **Storybook**: Large application - expect 30+ second build times

## Code Style guide

Refer to `STYLEGUIDE.md` for code style guidelines

## Additional instructions

- For Storybook files `**/*.stories.ts`, do not comment on the inclusion of `console` logs.

## Trust These Instructions

These instructions are based on comprehensive exploration and testing of the actual codebase. Only search for additional information if:

- These instructions are incomplete for your specific task
- You encounter errors not covered in the troubleshooting section
- The codebase has changed since these instructions were created

**Always prefer following these established patterns over creating new approaches.**
