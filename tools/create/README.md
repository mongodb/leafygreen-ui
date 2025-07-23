# `@lg-tools/create`

Creates a new LeafyGreen package

## Usage

Use from `@lg-tools/cli`:

```zsh
lg create <package-name>
```

## Options

### Scope

`-s`, `--scope`

The npm scope of the new package. Valid scopes are defined in the `package.json` `"lg.scopes"` property.

Defaults to the first entry in `lg.scopes`.

The directory is determined by the mapping defined in `lg.scopes`

```bash
# Create a new package in the @lg-charts scope
lg create my-package --scope @lg-charts
```

### Directory

`-d`, `--directory`

The directory to write the new package. Defaults to mapped directory of `--scope`.

```bash
# Create a new package in ./components
lg create my-package --directory './components'
```

### Parent

`-p`, `--parent`

Identifies the parent component of the new component. Creates a sub-component to the provided parent.

```bash
# Creates a new subcomponent of '@lg-charts/core'
lg create my-package --parent '@lg-charts/core'
```

### Dry

`-d`, `--dry`

Run without making any changes to the filesystem (default: `false`)

### Verbose

`-v`, `--verbose`

Prints additional information to the console (default: `false`)
