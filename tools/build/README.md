# `lg-tools/build`

Shared build config & scripts for LeafyGreen repositories

## Building all packages

We rely on `turbo` to handle all package builds. Run `turbo run <scripts>` to build packages in a monorepo.

### Building individual packages

Turbo requires a script to be defined on each package that is run for each job defined in turbo. We provide 3 such scripts to easily drop into each package.

For each package you want turbo to build, add the following scripts to package.json:

```json
  "scripts": {
    "build": "lg build-package",
    "tsc": "lg build-ts",
    "docs": "lg build-tsdoc"
  }
```

### Internal build script

The `lg` command is defined in `@lg-tools/cli`. In order to build a package that `cli` depends on, we won't be able to use the `lg` command.
To get around this, `@lg-tools/build` defines an internal command to be used in this special case.

For a package that cli depends on, define the following scripts in its `package.json`:

```json
  "scripts": {
    "build": "lg-internal-build-package",
    "tsc": "tsc --build tsconfig.json"
  }
```
