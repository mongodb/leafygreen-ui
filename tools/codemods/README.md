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
yarn lg codemod <codemod-name> <path> [...options]
```

### Arguments

#### `codemod`

name of codemod, see available codemods below.

<hr>

#### `path`

files or directory to transform

<hr>

### Options

#### `-i or --ignore`

Glob patterns to ignore

```js
yarn lg codemod <codemod-name> <path> --ignore **/node_modules/** **/.next/**
```

#### `-d or --dry`

Dry run (no changes to files are made)

```js
yarn lg codemod <codemod-name> <path> --dry
```

#### `-p or --print`

Print transformed files to stdout and changes are also made to files

```js
yarn lg codemod <codemod-name> <path> --print
```

#### `-f or --force`

Bypass Git safety checks and forcibly run codemods.

```js
yarn lg codemod <codemod-name> <path> --force
```

#### `--packages`

Restrict the codemod to certain packages

```js
yarn lg codemod <codemod-name> <path> --packages @leafygreen-ui/popover @leafygreen-ui/select
```

## Codemods

### `popover-v12`

This codemod can be used to get started in refactoring LG components dependent on v12+ of `@leafygreen-ui/popover`.

By default, the codemod will apply for all below listed packages. Use the `--packages` flag to filter for a subset of these.

This codemod does the following:

1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop for components in the following packages:

- `@leafygreen-ui/combobox`
- `@leafygreen-ui/menu`
- `@leafygreen-ui/popover`
- `@leafygreen-ui/select`
- `@leafygreen-ui/split-button`
- `@leafygreen-ui/tooltip`

2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from the following components:

- `@leafygreen-ui/info-sprinkle`
- `@leafygreen-ui/inline-definition`
- `@leafygreen-ui/number-input`

3. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, and `scrollContainer` props from the following components:

- `@leafygreen-ui/date-picker`
- `@leafygreen-ui/guide-cue`

4. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `scrollContainer`, and `usePortal` props from `Code` component in the `@leafygreen-ui/code` package
5. Removes `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from `SearchInput` component in the `@leafygreen-ui/search-input` package
6. Removes `shouldTooltipUsePortal` prop from `Copyable` component in the `@leafygreen-ui/copyable` package

```js
yarn lg codemod popover-v12 <path> --packages @leafygreen-ui/combobox @leafygreen-ui/code @leafygreen-ui/info-sprinkle @leafygreen-ui/copyable
```

**Before**:

```jsx
import LeafyGreenCode from '@leafygreen-ui/code';
import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { DatePicker } from '@leafygreen-ui/date-picker';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { Menu } from '@leafygreen-ui/menu';
import Copyable from '@leafygreen-ui/copyable';

<LGCombobox />
<LGCombobox usePortal={true} />
<LGCombobox usePortal={false} />

<LeafyGreenCode portalClassName="portal-class" portalRef={ref} usePortal />
<InfoSprinkle popoverZIndex={9999} usePortal={false} />

<DatePicker portalContainer={containerRef} scrollContainer={containerRef} />
<Menu portalClassName="portal-class" usePortal />

<Copyable shouldTooltipUsePortal />
<Copyable shouldTooltipUsePortal={true} />
<Copyable shouldTooltipUsePortal={false} />
```

**After**:

```jsx
import LeafyGreenCode from '@leafygreen-ui/code';
import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { DatePicker } from '@leafygreen-ui/date-picker';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { Menu } from '@leafygreen-ui/menu';
import Copyable from '@leafygreen-ui/copyable';

<LGCombobox renderMode="portal" />
<LGCombobox renderMode="portal" />
<LGCombobox renderMode="inline" />

<LeafyGreenCode />
<InfoSprinkle />

<DatePicker portalContainer={containerRef} scrollContainer={containerRef} />
<Menu portalClassName="portal-class" usePortal />

<Copyable />
<Copyable />
<Copyable />
```
