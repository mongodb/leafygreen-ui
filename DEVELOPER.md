# Developer Guide

This guide covers advanced development workflows, testing strategies, and maintainer-specific processes for LeafyGreen UI. For getting started with contributions, see the [Contributing Guide](./CONTRIBUTING.md).

## Table of Contents

- [Testing in External Applications](#testing-in-external-applications)
  - [Linking Packages](#linking-packages)
  - [Using a Local Registry (Verdaccio)](#using-a-local-registry-verdaccio)
- [Publishing](#publishing)
  - [Publishing a New Package](#publishing-a-new-package)
  - [Publishing Pre-releases](#publishing-pre-releases)
- [Storybook Integration](#storybook-integration)
- [mongodb.design Integration](#mongodbdesign-integration)

---

## Testing in External Applications

When developing components, you may need to test changes in an external application before publishing. There are two approaches: linking packages directly, or using a local registry.

### Linking Packages

We provide a `link` script to symlink in-development components to your application:

```bash
pnpm run link --to=[path-to-application]
```

The script:

1. Scans the destination application for installed `leafygreen-ui` packages
2. Runs `pnpm link` in each corresponding LeafyGreen package directory
3. Links the packages in your destination application

After linking, changes to LeafyGreen components will be reflected in your application after rebuilding.

> **Note**: For new/unpublished packages, create the package directory in your application's `node_modules` before running the link command.

#### Troubleshooting Linking

| Issue                                  | Solution                                                            |
| -------------------------------------- | ------------------------------------------------------------------- |
| Multiple packages failing              | Add `--no-parallel` flag to run linking sequentially                |
| Node version manager issues (asdf/nvm) | Add `--launch-env="$(env)"` flag                                    |
| React version conflicts                | Add a webpack alias to resolve React from your app's `node_modules` |

**Webpack alias for React conflicts:**

```js
resolve: {
  alias: {
    react: path.dirname(require.resolve('react/package.json'))
  },
},
```

> **Recommendation**: If you encounter persistent linking issues, use Verdaccio (below) instead—it's more reliable for testing in external projects.

### Using a Local Registry (Verdaccio)

[Verdaccio](https://verdaccio.org/) provides a local npm registry for testing packages without publishing to npm.

#### Setup

1. **Install Verdaccio globally**

   ```bash
   pnpm install --global verdaccio
   ```

2. **Start the Verdaccio server**

   ```bash
   verdaccio
   ```

   The server runs at `http://localhost:4873/` by default.

3. **Configure npm to use your local registry**

   ```bash
   npm config set @leafygreen-ui:registry http://localhost:4873
   ```

   Verify the configuration:

   ```bash
   cat ~/.npmrc
   # Should contain: @leafygreen-ui:registry=http://localhost:4873
   ```

#### Publishing to Verdaccio

1. **Build and publish**

   ```bash
   pnpm build
   cd packages/<package-name>
   pnpm publish
   ```

2. **Verify the registry** (optional dry-run)

   ```bash
   pnpm publish --dry-run
   # Should show: Publishing to http://localhost:4873
   ```

3. **If prompted to log in**

   ```bash
   npm adduser --registry http://localhost:4873
   ```

#### Installing in Your Application

```bash
cd /path/to/your-app
pnpm install @leafygreen-ui/<package-name>
```

#### Publishing Additional Versions

1. Update the version in `packages/<package-name>/package.json`
2. Re-run `pnpm publish`
3. Update the version in your external project

#### Cleanup

When finished, remove the local registry reference from `~/.npmrc`:

```bash
npm config delete @leafygreen-ui:registry
```

---

## Publishing

### Publishing a New Package

This repository uses [npm trusted publishing with OIDC](https://docs.npmjs.com/trusted-publishers) for secure automated releases. However, **new packages require a manual first publish**.

#### Initial Publish Steps

1. **Build the package**

   ```bash
   pnpm build --filter="<package-name>"
   ```

2. **Publish to npm**

   ```bash
   cd <directory>/<package-name>
   npm publish --access public
   ```

3. **Configure trusted publisher** on [npmjs.com](https://www.npmjs.com):
   - Navigate to your package → Settings → Trusted Publishers
   - Add a trusted publisher with:
     - **Repository**: `mongodb/leafygreen-ui`
     - **Workflow**: `release.yml`

#### Subsequent Releases

After initial setup, releases are automated:

1. Add a changeset: `pnpm changeset`
2. Merge your PR to `main`
3. The "Version Packages" PR is created automatically
4. Merge the "Version Packages" PR to publish

### Publishing Pre-releases

Pre-releases allow testing alpha/beta/next versions before a full release.

Read the [changesets pre-release guide](https://github.com/changesets/changesets/blob/main/docs/prereleases.md) for full details.

#### Pre-release Workflow

1. **Create a pre-release branch** from your feature branch

   ```bash
   git checkout -b pre-release
   ```

2. **Enter pre-release mode**

   ```bash
   pnpm changeset pre enter beta  # or: alpha, next, rc
   ```

3. **Update package versions**

   ```bash
   pnpm changeset version
   ```

   Packages with changesets become `X.Y.Z-beta.0`

4. **Commit the version updates**

   ```bash
   git commit -am "chore: prerelease version packages"
   ```

5. **Build and publish**

   ```bash
   pnpm build <...components>
   pnpm changeset publish
   ```

#### Updating Pre-releases

Continue development on your original feature branch. To publish updates:

1. Pull changes from the feature branch into `pre-release`
2. Run steps 3-5 above

When your feature branch merges to `main`, delete the `pre-release` branch.

---

## Storybook Integration

### Specifying the Default Story for mongodb.design

The mongodb.design website imports `*.story.tsx` files to render live examples. By default, the first exported story is rendered.

To specify a different story:

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

---

## mongodb.design Integration

### Excluding Interfaces from Code Docs

The mongodb.design code docs automatically import all exported interfaces. Some are excluded by default:

- Interfaces marked with `@internal` in TSDoc
- Interfaces marked with `@example` in TSDoc

To force exclusion of an interface, add the `@noDocgen` flag:

```typescript
/**
 * Internal helper type - not for public use
 * @noDocgen
 */
export interface InternalHelperProps {
  // ...
}
```

---

## Additional Resources

| Resource                                | Description                        |
| --------------------------------------- | ---------------------------------- |
| [Contributing Guide](./CONTRIBUTING.md) | Getting started with contributions |
| [Style Guide](./STYLEGUIDE.md)          | Code style conventions             |
| [README](./README.md)                   | Project overview and package list  |
