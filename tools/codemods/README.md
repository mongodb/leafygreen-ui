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

### `consolidate-props`

This codemod consolidates two props into one.

```jsx
yarn lg codemod codemode-props <path>
```

E.g.
In this example, the `disabled` props is merged into the `state` prop.

**Before**:

```jsx
<MyComponent disabled={true} state="valid" />
```

**After**:

```jsx
<MyComponent state="disabled" />
```

<hr>

### `rename-component-prop`

This codemod renames a component prop

```jsx
yarn lg codemod codemode-component-prop <path>
```

E.g.
In this example, `prop` is renamed to `newProp`.

**Before**:

```jsx
<MyComponent prop="hey" />
```

**After**:

```jsx
<MyComponent newProp="hey" />
```

<hr>

### `update-component-prop-value`

This codemod updates a prop value

```jsx
yarn lg codemod codemode-component-prop-value <path>
```

E.g.
In this example, `value` is updated to `new prop value`.

**Before**:

```jsx
<MyComponent prop="value" />
```

**After**:

```jsx
<MyComponent prop="new prop value" />
```
