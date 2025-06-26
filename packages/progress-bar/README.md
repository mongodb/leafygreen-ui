# Progress Bar

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/progress-bar.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/progress-bar/live-example/)

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

```js
import ProgressBar from '@leafygreen-ui/progress-bar';

const [uploaded, setUploaded] = useState(0);
const [paused, setPaused] = useState(false);
const total = 100;

const processUpload = () => {...}

<ProgressBar
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

## Properties

The`ProgressBar` component supports two modes: determinate, where progress is represented by a specific value that increases over time, and indeterminate, where progress is ongoing without a fixed value, shown as a looping animation. Pick the appropriate mode based on whether or not you know the total possible progress.

| Prop name          | Type                                                                                                   | Default    | Mode             | Description                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ---------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `variant?`         | `'info'` \| `'success'` \| `'warning'` \| `'error'`                                                    | `'info'`   | both             | Optional color theme.                                                                                                            |
| `label?`           | `React.ReactNode`                                                                                      |            | both             | Optional label text displayed directly above the progress bar.                                                                   |
| `size?`            | `'small'` \| `'default'` \| `'large'`                                                                  | `'medium'` | both             | Optional size (thickness) of the progress bar.                                                                                   |
| `description?`     | `React.ReactNode`                                                                                      |            | both             | Optional descriptive text below the progress bar.                                                                                |
| `darkMode?`        | `boolean`                                                                                              | `false`    | both             | If true, enables dark mode styling.                                                                                              |
| `formatValue?`     | `'number'` \| `'fraction'` \| `'percentage'` \| `(value: number, maxValue: number) => React.ReactNode` |            | both             | Optional formatting of progress value text. If not defined, progress value is not displayed.                                     |
| `showIcon?`        | `boolean`                                                                                              | `false`    | both             | If true, displays icon next to progress value. If `variant` is `'success'`, the icon only appears when progress reaches 100%.    |
| `isIndeterminate`  | `boolean`                                                                                              | `false`    | both             | Enables indeterminate mode. When `true`, progress appears as an infinite looping animation.                                      |
| `value`            | `number`                                                                                               |            | both             | Required current progress value. Optional **only** if `isIndeterminate` is `true`.                                               |
| `maxValue?`        | `number`                                                                                               | `1`        | determinate only | Optional total progress value. Unavailable if `isIndeterminate` is `true`.                                                       |
| `enableAnimation?` | `boolean`                                                                                              | `false`    | determinate only | If true, enables shimmer animation to indicate progression for longer-running tasks. Unavailable if `isIndeterminate` is `true`. |
| `disabled?`        | `boolean`                                                                                              | `false`    | determinate only | If true, pauses the progress bar and renders it in a gray color. Unavailable if `isIndeterminate` is `true`.                     |
