# Progress Bar

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/progress-bar.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/progress-bar/live-example/)

## Description

The `ProgressBar` component supports two types:

- **Loader**, which has determinate and indeterminate modes. Determinate loaders dynamically approach a maximum; indeterminate loaders loop infinitely.
- **Meter**, which displays a static snapshot of progress at some point in time. By default, meters are determinate only.

Use a meter when you want to show precise progress alongside a health status (e.g., amount of disk space used). Use loaders when you want to show progress towards completion of ongoing activity (e.g., file upload progress).

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/progress-bar
```

### Yarn

```shell
yarn add @leafygreen-ui/progress-bar
```

### NPM

```shell
npm install @leafygreen-ui/progress-bar
```

## Example

### Determinate Loader

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

const [uploaded, setUploaded] = useState(0);
const [paused, setPaused] = useState(false);
const total = 100;

<ProgressBar
  type="loader"
  variant="success"
  label="File Upload"
  size="small"
  description="Your data is uploading!"
  disabled={paused}
  formatValue={(value: number, maxValue: number) =>
    `${value}/${maxValue} files`
  }
  showIcon={true}
  value={uploaded}
  maxValue={total}
/>;
```

### Indeterminate Loader

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

const [uploaded, setUploaded] = useState(0);
const [paused, setPaused] = useState(false);

<ProgressBar
  type="loader"
  isIndeterminate={true}
  label="Files Downloading"
  description="Your data is uploading!"
  formatValue={(value: number) => `${value} files downloaded`}
  value={uploaded}
/>;
```

### Meter

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

const [used, setUsed] = useState(14);
const totalSpaceAvailable = 128

<ProgressBar
  type="meter"
  status="healthy"
  label="Disk Space Used"
  formatValue={(value: number, maxValue: number) =>
    `${value}/${maxValue} GB used`
  }
  value={used}
  maxValue={totalSpaceAvailable}
/>;
```

## Properties

| Prop name          | Type                                                                                           | Default     | Type                           | Description                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`             | `'meter'` \| `'loader'`                                                                        |             | both                           | Specifies whether the progress bar is a meter or loader.                                                                                   |
| `label?`           | `React.ReactNode`                                                                              |             | both                           | Optional label text displayed directly above the progress bar.                                                                             |
| `size?`            | `'small'` \| `'default'` \| `'large'`                                                          | `'default'` | both                           | Optional size (thickness) of the progress bar.                                                                                             |
| `description?`     | `React.ReactNode`                                                                              |             | both                           | Optional descriptive text displayed below the progress bar.                                                                                |
| `darkMode?`        | `boolean`                                                                                      | `false`     | both                           | Enables dark mode styling.                                                                                                                 |
| `formatValue?`     | `'number'` \| `'fraction'` \| `'percentage'` \| `(value: number, maxValue?: number) => string` |             | both                           | Optional formatter for the progress value text. If not provided, progress value is hidden.                                                 |
| `showIcon?`        | `boolean`                                                                                      | `false`     | both                           | Displays an icon next to the progress value. For loaders with `'success'` variant, icon shows only at 100%.                                |
| `value`            | `number`                                                                                       |             | both                           | Current progress value. **Optional only if `isIndeterminate` is `true` for loaders**.                                                      |
| `maxValue?`        | `number`                                                                                       | `1`         | meter, determinate loader only | Optional maximum progress value. Not available if `isIndeterminate` is `true` for loaders.                                                 |
| `disabled?`        | `boolean`                                                                                      | `false`     | meter, determinate loader only | Pauses progress and shows a disabled style. Not available if `isIndeterminate` is `true` for loaders.                                      |
| `status?`          | `'healthy'` \| `'warning'` \| `'danger'`                                                       |             | meter only                     | Status for meter type indicating health or error state. If not provided, defaults to blue.                                                 |
| `variant?`         | `'info'` \| `'success'` \| `'warning'` \| `'error'`                                            | `'info'`    | loader only                    | Variant for loader type. Animation is only available for `'info'` or `'success'` variants.                                                 |
| `isIndeterminate?` | `boolean`                                                                                      | `false`     | loader only                    | When `true`, shows an infinite looping animation along the bar.                                                                            |
| `enableAnimation?` | `boolean`                                                                                      | `false`     | determinate loader only        | When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. |

## Test Harnesses

### `getTestUtils`

`getTestUtils()` exposes helper functions to access inner elements of the `ProgressBar` component for testing.

#### Single `ProgressBar`

```tsx
import {
  getTestUtils,
  renderProgressBar,
} from '@leafygreen-ui/progress-bar/testing';

test('renders single progress bar', () => {
  renderProgressBar();

  const { getBar } = getTestUtils();

  expect(getBar()).toBeInTheDocument();
});
```

#### Multiple `ProgressBar` components

```tsx
import {
  getTestUtils,
  renderMultipleProgressBars,
} from '@leafygreen-ui/progress-bar/testing';

test('renders multiple progress bars', () => {
  renderMultipleProgressBars();

  const utilsOne = getTestUtils('lg-progress_bar_1');
  const utilsTwo = getTestUtils('lg-progress_bar_2');

  expect(utilsOne.getBar()).toBeInTheDocument();
  expect(utilsTwo.getBar()).toBeInTheDocument();
});
```

### Test Utils

```tsx
const {
  getContainer,
  getBar,
  getBarFill,
  getBarTrack,
  queryIcon,
  queryLabel,
  queryDescription,
  queryValueText,
} = getTestUtils();
```

| Util               | Description                                                                                                        | Returns                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `getContainer`     | Returns the root element containing the progress bar and all accompanying text.                                    | `HTMLDivElement`         |
| `getBar`           | Returns the progress bar element, which can be either a loader (`role="progressbar"`) or a meter (`role="meter"`). | `HTMLDivElement`         |
| `getBarFill`       | Returns the fill element of the progress bar.                                                                      | `HTMLDivElement`         |
| `getBarTrack`      | Returns the track element of the progress bar.                                                                     | `HTMLDivElement`         |
| `queryIcon`        | Returns the icon element, if present.                                                                              | `HTMLDivElement \| null` |
| `queryLabel`       | Returns the label element, if present.                                                                             | `HTMLDivElement \| null` |
| `queryDescription` | Returns the description element, if present.                                                                       | `HTMLDivElement \| null` |
| `queryValueText`   | Returns the value text element, if present.                                                                        | `HTMLDivElement \| null` |
