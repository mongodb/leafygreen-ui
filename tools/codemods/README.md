# Codemods

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/codemods.svg)

## Installation

### Yarn

```shell
yarn add @lg-tools/codemods
```

### NPM

```shell
npm install @lg-tools/codemods
```

## Usage

```jsx
yarn lg codemod <codemod> <path> [...options]
```

### Arguments

#### `codemod`

name of codemod, see available codemods below.

<hr>

#### `path`

files or directory to transform

<hr>

### Options

#### `--i or --ignore`

Glob patterns to ignore

```jsx
yarn lg codemod <codemode> <path> --ignore **/node_modules/** **/.next/**
```

#### `--d or --dry`

Dry run (no changes to files are made)

```jsx
yarn lg codemod <codemode> <path> --dry
```

#### `--p or --print`

Print transformed files to stdout and changes are also made to files

```jsx
yarn lg codemod <codemode> <path> --print
```

#### `--f or --force`

Bypass Git safety checks and forcibly run codemods.

```jsx
yarn lg codemod <codemode> <path> --force
```

## Codemods

**_NOTE:_ These codemods are for testing purposes only**

### `consolidate-popover-usePortal-renderMode-props`

This codemod adds an explicit `usePortal` prop if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop.

```jsx
yarn lg codemod consolidate-popover-usePortal-renderMode-props <path>
```

**Before**:

```jsx
<Popover />
<Popover usePortal={true} />
<Popover usePortal={false} />
```

**After**:

```jsx
<Popover renderMode="portal" />
<Popover renderMode="portal" />
<Popover renderMode="inline" />
```
