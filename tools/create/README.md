# `@lg-tools/create`

Creates a new LeafyGreen package

## Usage

Use from `@lg-tools/cli`:

```zsh
lg create <package-name>
```

## Initial Publish Required

After creating a new package, **you must manually publish the first version** before the automated release workflow can take over. This is because the repository uses [npm trusted publishing with OIDC](https://docs.npmjs.com/trusted-publishers), which requires the package to exist on npm before it can be configured.

### Steps after creating a new package:

1. Build the package: `pnpm build --filter="<package-name>"`
2. Publish: `cd <directory>/<package-name> && npm publish --access public`
3. Configure trusted publisher on [npmjs.com](https://www.npmjs.com):
   - Go to package Settings → Trusted Publishers
   - Add: Repository `mongodb/leafygreen-ui`, Workflow `release.yml`

After this setup, all future releases will be automated via changesets.

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
