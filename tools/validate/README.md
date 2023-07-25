# `@lg-tools/validate`

Package validation scripts for LeafyGreen

## Usage

This package is a sub-module of `@lg-tools/cli`.

To validate builds & dependencies, run

```bash
> lg validate
```

### Builds

Validates whether the output of the build command, and that each module type is valid.

To validate builds only:

```bash
> lg validate --buildsOnly
```

### Dependencies

Uses `depcheck` to ensure all dependencies are valid in a package.

To validate dependencies only:

```bash
> lg validate --depsOnly
```
