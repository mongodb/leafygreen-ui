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

### `popover-v12`

This codemod does the following:

1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop for the following components:

- `Combobox`
- `Menu`
- `Popover`
- `Select`
- `SplitButton`
- `Tooltip`

2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from the following components:

- `Code`
- `DatePicker`
- `GuideCue`
- `InfoSprinkle`
- `InlineDefinition`
- `NumberInput`
- `SearchInput`

3. Removes `shouldTooltipUsePortal` prop from `Copyable` component

```jsx
yarn lg codemod popover-v12 <path>
```

**Before**:

```jsx
<Combobox />
<Combobox usePortal={true} />
<Combobox usePortal={false} />

<Code portalClassName="portal-class" portalRef={ref} usePortal />
<DatePicker portalContainer={containerRef} scrollContainer={containerRef} />
<InfoSprinkle popoverZIndex={9999} usePortal={false} />

<Copyable shouldTooltipUsePortal />
<Copyable shouldTooltipUsePortal={true} />
<Copyable shouldTooltipUsePortal={false} />
```

**After**:

```jsx
<Combobox renderMode="portal" />
<Combobox renderMode="portal" />
<Combobox renderMode="inline" />

<Code />
<DatePicker />
<InfoSprinkle />

<Copyable />
<Copyable />
<Copyable />
```
