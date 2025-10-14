# Codemods

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/codemods.svg)

## Installation

### PNPM

```shell
pnpm add @lg-tools/codemods
```

### Yarn

```shell
yarn add @lg-tools/codemods
```

### NPM

```shell
npm install @lg-tools/codemods
```

## Usage

```shell
pnpm lg codemod <codemod-name> <path> [...options]
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

```shell
pnpm lg codemod <codemod-name> <path> --ignore **/node_modules/** **/.next/**
```

#### `-d or --dry`

Dry run (no changes to files are made)

```shell
pnpm lg codemod <codemod-name> <path> --dry
```

#### `-p or --print`

Print transformed files to stdout and changes are also made to files

```shell
pnpm lg codemod <codemod-name> <path> --print
```

#### `-f or --force`

Bypass Git safety checks and forcibly run codemods.

```shell
pnpm lg codemod <codemod-name> <path> --force
```

#### `--packages`

Restrict the codemod to certain packages

```shell
pnpm lg codemod <codemod-name> <path> --packages @leafygreen-ui/popover @leafygreen-ui/select
```

## Codemods

### `modal-v20`

This codemod can be used to upgrade Modal components to v20.

By default, the codemod will apply for all below listed packages. Use the `--packages` flag to filter for a subset of these. However, it is recommended to upgrade all packages simultaneously.

- `@leafygreen-ui/modal`
- `@leafygreen-ui/confirmation-modal`
- `@leafygreen-ui/marketing-modal`

This codemod does the following:

1. Renames `className` prop to `backdropClassName`
2. Renames `contentClassName` prop to `className`
3. Removes `initialFocus` prop and adds guidance comment

```shell
pnpm lg codemod modal-v20 <path>
```

**Before**:

```tsx
import Modal from '@leafygreen-ui/modal';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';

<Modal
  open={open}
  setOpen={setOpen}
  className="backdrop-style"
  contentClassName="modal-content"
  initialFocus="#primary-button"
>
  <button id="primary-button">Primary Action</button>
</Modal>

<ConfirmationModal
  open={open}
  setOpen={setOpen}
  className="confirmation-backdrop"
  contentClassName="confirmation-content"
  initialFocus="#confirm-button"
  title="Confirm"
>
  <button id="confirm-button">Confirm</button>
</ConfirmationModal>
```

**After**:

```tsx
import Modal from '@leafygreen-ui/modal';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';

{
  /* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */
}
<Modal
  open={open}
  setOpen={setOpen}
  backdropClassName="backdrop-style"
  className="modal-content"
>
  <button id="primary-button">Primary Action</button>
</Modal>;

{
  /* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */
}
<ConfirmationModal
  open={open}
  setOpen={setOpen}
  backdropClassName="confirmation-backdrop"
  className="confirmation-content"
  title="Confirm"
>
  <button id="confirm-button">Confirm</button>
</ConfirmationModal>;
```

### `named-exports`

This codemod converts default imports to named imports for LeafyGreen UI components.

By default, the codemod will apply for all below listed packages. Use the `--packages` flag to filter for a subset of these.

- `@leafygreen-ui/badge`
- `@leafygreen-ui/banner`
- `@leafygreen-ui/button`
- `@leafygreen-ui/callout`
- `@leafygreen-ui/card`
- `@leafygreen-ui/checkbox`
- `@leafygreen-ui/code`
- `@leafygreen-ui/confirmation-modal`
- `@leafygreen-ui/copyable`
- `@leafygreen-ui/expandable-card`
- `@leafygreen-ui/form-footer`
- `@leafygreen-ui/icon`
- `@leafygreen-ui/icon-button`
- `@leafygreen-ui/inline-definition`
- `@leafygreen-ui/logo`
- `@leafygreen-ui/marketing-modal`
- `@leafygreen-ui/modal`
- `@leafygreen-ui/pagination`
- `@leafygreen-ui/popover`
- `@leafygreen-ui/portal`
- `@leafygreen-ui/stepper`
- `@leafygreen-ui/text-area`
- `@leafygreen-ui/text-input`
- `@leafygreen-ui/toggle`
- `@leafygreen-ui/tooltip`

```shell
pnpm lg codemod named-exports <path>
```

**Before**:

```tsx
import Button, { Size } from '@leafygreen-ui/button';
import LGModal from '@leafygreen-ui/modal';
import Tooltip from '@leafygreen-ui/tooltip';
```

**After**:

```tsx
import { Button, Size } from '@leafygreen-ui/button';
import { Modal as LGModal } from '@leafygreen-ui/modal';
import { Tooltip } from '@leafygreen-ui/tooltip';
```

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

7. Replaces `justify="fit"` prop value with `justify="middle"` for components in the following packages:

- `@leafygreen-ui/date-picker`
- `@leafygreen-ui/info-sprinkle`
- `@leafygreen-ui/inline-definition`
- `@leafygreen-ui/menu`
- `@leafygreen-ui/popover`
- `@leafygreen-ui/tooltip`

```shell
pnpm lg codemod popover-v12 <path> --packages @leafygreen-ui/combobox @leafygreen-ui/code @leafygreen-ui/info-sprinkle @leafygreen-ui/copyable
```

**Before**:

```jsx
import LeafyGreenCode from '@leafygreen-ui/code';
import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { DatePicker } from '@leafygreen-ui/date-picker';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { Menu } from '@leafygreen-ui/menu';
import Copyable from '@leafygreen-ui/copyable';
import Tooltip from '@leafygreen-ui/tooltip';

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

<Menu justify="fit" renderMode="top-layer" />
<Tooltip justify="fit" renderMode="top-layer" />
```

**After**:

```tsx
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

<Menu justify="middle" renderMode="top-layer" />
<Tooltip justify="middle" renderMode="top-layer" />
```

### `loading-spinner-v5`

This codemod can be used to upgrade Spinner components to v4 of `@leafygreen-ui/loading-indicator`.

This codemod applies to the following package:

- `@leafygreen-ui/loading-indicator`

This codemod does the following:

1. Converts `displayOption` prop to `size` prop with appropriate value mapping
2. Removes `description` prop and adds guidance comment
3. Removes `baseFontSize` prop if present

```shell
pnpm lg codemod loading-spinner-v5 <path>
```

**Before**:

```tsx
import { Spinner } from '@leafygreen-ui/loading-indicator';

<Spinner
  displayOption="default-vertical"
  description="Loading data..."
  darkMode={true}
/>
<Spinner
  displayOption="large-vertical"
  description="Processing..."
  baseFontSize={16}
/>
```

**After**:

```tsx
import { Spinner } from '@leafygreen-ui/loading-indicator';

/* Previous description: "Loading data..." */
/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */

<Spinner size="default" darkMode={true} />;

/* Previous description: "Processing..." */
/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */
<Spinner size="large" />;
```

### `tabs-v17`

This codemod can be used to get started in upgrading LG `Tabs` instances to v17 of `@leafygreen-ui/tabs`.

In LG `Tabs` instances, this codemod will rename the `selected` prop to `value` and the `setSelected` prop to `onValueChange`.

```shell
pnpm lg codemod tabs-v17 <path>
```

**Before**:

```tsx
import { Tabs, Tab } from '@leafygreen-ui/tabs';

<Tabs selected={0} setSelected={() => {}}>
  <Tab name="Tab 1">Tab 1</Tab>
  <Tab name="Tab 2">Tab 2</Tab>
</Tabs>;
```

**After**:

```tsx
import { Tabs, Tab } from '@leafygreen-ui/tabs';

<Tabs value={0} onValueChange={() => {}}>
  <Tab name="Tab 1">Tab 1</Tab>
  <Tab name="Tab 2">Tab 2</Tab>
</Tabs>;
```
