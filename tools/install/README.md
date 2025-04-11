# `@lg-tools/install`

Install LeafyGreen packages

## Usage

Use from `@lg-tools/cli`.

Install all `@leafygreen-ui` packages

```bash
> lg install
```

Install select packages by listing them:

```bash
> lg install lib palette
```

### Installation Options

You can also use flags to install specific subsets of packages:

#### Essential Packages

Install only the essential packages
(Essential packages includes only `@leafygreen-ui/leafygreen-provider`, `@leafygreen-ui/emotion`, and `@leafygreen-ui/lib`)

```bash
> lg install --essentials
```

#### Basic Packages

Install basic components. Includes essentials plus commonly used components. (See [`./src/getPackagesToInstall.ts`](./src/getPackagesToInstall.ts) for the latest list of "basic" pacages)

```bash
> lg install --basic
```

#### Scope-based Installation

Install only packages from specific scopes:

```bash
> lg install --core    # Only installs @leafygreen-ui/* packages
> lg install --charts  # Only installs @lg-charts/* packages
> lg install --chat    # Only installs @lg-chat/* packages
```

Flags can be combined to install multiple scopes:

```bash
> lg install --core --charts  # Install both UI and chart packages
```

#### Other Options

```bash
> lg install --dry      # Dry run - shows what would be installed without making changes
> lg install --verbose  # Shows detailed information during installation
```
