# @lg-tools/build

## 0.2.0

### Minor Changes

- c2908c5a: Updates `build` package to use Rollup's JS API rather than spawning rollup using the command line. This gives us more control over the build, and we don't need to worry about the path of the `rollup` binary in consuming ap
  plications

### Patch Changes

- 746962d9: Adds missing dependency `glob` to build package
- 6776fee7: Adds `root.tsconfig.json`. Establishes rules for the root level tsconfig

## 0.1.2

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications

## 0.1.1

### Patch Changes

- ff02d0bb: Updates rollup config to polyfill node builtins.

## 0.1.0

### Minor Changes

- 215268ff: First pre-release of build tools. This package includes shared ts, rollup & babel config

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Fix broken builds

## 0.1.0-beta.9

### Minor Changes

- d84e7eba1: First pre-release of build tools. This package includes shared ts, rollup & babel config

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- 9476719bd: Fix broken builds

## 0.1.0-beta.8

### Patch Changes

- Adds README.md. Minor bug fixes

## 0.1.0-beta.7

### Patch Changes

- 78acda539: Fix broken builds

## 0.1.0-beta.0-6

### Minor Changes

- d84e7eba: First pre-release of build tools. This package includes shared ts, rollup & babel config
