# Progress Bar

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/progress-bar.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/progress-bar/live-example/)

## Description

The `ProgressBar` component supports two types:

- **Indeterminate** — shows an infinite looping animation to indicate ongoing activity without specifying exact progress. Useful when the duration or total work is unknown.
- **Determinate** — shows measurable progress toward a known maximum. When using a determinate progress bar, specify whether you're using it as a:
  - **Meter** — a snapshot of current value, often with a health/status indication (e.g., disk space used).
  - **Progress bar** — a dynamic bar that fills as a task progresses toward completion (e.g., file upload).

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

### Determinate Bar With Progress Role (Default)

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

const [uploaded, setUploaded] = useState(0);
const [paused, setPaused] = useState(false);
const total = 100;

<ProgressBar
  variant="success"
  label="File Upload"
  size="small"
  description="Your data is uploading!"
  disabled={paused}
  formatValue={(value: number, maxValue: number) =>
    `${value}/${maxValue} files`
  }
  showIcon
  value={uploaded}
  maxValue={total}
/>;
```

### Determinate Bar With Meter Role

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

const [used, setUsed] = useState(96);
const totalSpaceAvailable = 128;

<ProgressBar
  role="meter"
  variant="warning"
  label="Disk Space Used"
  formatValue={(value: number, maxValue: number) =>
    `${value}/${maxValue} GB used`
  }
  value={used}
  maxValue={totalSpaceAvailable}
/>;
```

### Indeterminate Bar

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

<ProgressBar
  isIndeterminate
  label="Loading report"
  description="This might take a few seconds..."
/>;
```

## Properties

| Prop               | Type                                                                                           | Default         | Applicable To                            | Description                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size?`            | `'small'` \| `'default'` \| `'large'`                                                          |                 | all                                      | Optional size (thickness) of the progress bar.                                                                                                                                                              |
| `description?`     | `React.ReactNode \| Array<React.ReactNode>`                                                    |                 | all                                      | Optional descriptive text below the progress bar. If multiple items are provided in an array, they will be automatically rotated every 2000 milliseconds. Single items are returned as-is without rotation. |
| `formatValue?`     | `'number'` \| `'fraction'` \| `'percentage'` \| `(value: number, maxValue?: number) => string` |                 | all                                      | Optional formatting of progress value text. If undefined, no progress value is displayed.                                                                                                                   |
| `showIcon?`        | `boolean`                                                                                      | `false`         | all                                      | When `true`, displays icon next to progress value. If `variant` is `'success'`, the icon only appears when progress reaches 100%.                                                                           |
| `variant?`         | `'info'` \| `'success'` \| `'warning'` \| `'error'`                                            | `'info'`        | all                                      | Optional variant of the progress bar. Defaults to `'info'`.                                                                                                                                                 |
| `isIndeterminate?` | `boolean`                                                                                      | `false`         | all                                      | When `true`, shows an infinite looping animation along the bar instead of a specific width. **Only available for `info` and `success` variants**.                                                           |
| `role?`            | `'progressbar'` \| `'meter'`                                                                   | `'progressbar'` | determinate only                         | If determinate, specify role of the progress bar ("progressbar" or "meter"). Defaults to "progressbar".                                                                                                     |
| `value`            | `number`                                                                                       |                 | all                                      | Current progress value. **Optional only if isIndeterminate is `true`.**                                                                                                                                     |
| `maxValue?`        | `number`                                                                                       |                 | determinate only                         | If determinate, specify maximum progress value.                                                                                                                                                             |
| `enableAnimation?` | `boolean`                                                                                      | `false`         | determinate with role "progressbar" only | When `true`, enables shimmer animation for longer-running processes. **Only available for determinate bars with role "progressbar".** **Only available for `info` and `success` variants.**                 |
| `disabled?`        | `boolean`                                                                                      | `false`         | determinate only                         | When `true`, shows a disabled style and pauses animation.                                                                                                                                                   |

## Test Harnesses

### `getTestUtils`

`getTestUtils()` exposes helper functions to access inner elements of the `ProgressBar` component for testing.

#### Single `ProgressBar`

```tsx
import { getTestUtils } from '@leafygreen-ui/progress-bar/testing';

test('renders single progress bar', () => {
  // ...code to render a progress bar

  const { getBar } = getTestUtils();

  expect(getBar()).toBeInTheDocument();
});
```

#### Multiple `ProgressBar` components

```tsx
import { getTestUtils } from '@leafygreen-ui/progress-bar/testing';

test('renders multiple progress bars', () => {
  // ...code to render multiple progress bars

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

| Util                 | Description                                                                                                        | Returns                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `getContainer`       | Returns the root element containing the progress bar and all accompanying text.                                    | `HTMLDivElement`         |
| `getBar`             | Returns the progress bar element, which can have either `role="progressbar"` or `role="meter"` depending on usage. | `HTMLDivElement`         |
| `getBarFill`         | Returns the fill element of the progress bar.                                                                      | `HTMLDivElement`         |
| `getBarTrack`        | Returns the track element of the progress bar.                                                                     | `HTMLDivElement`         |
| `getBarFillWidthVar` | Returns the width of the progress bar fill element, either from CSS variable or inline style.                      | `HTMLDivElement`         |
| `queryIcon`          | Returns the icon element, if present.                                                                              | `HTMLDivElement \| null` |
| `queryLabel`         | Returns the label element, if present.                                                                             | `HTMLDivElement \| null` |
| `queryDescription`   | Returns the description element, if present.                                                                       | `HTMLDivElement \| null` |
| `queryValueText`     | Returns the value text element, if present.                                                                        | `HTMLDivElement \| null` |
