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

## Properties

The `ProgressBar` component supports two types:

- **Meter**, which displays a static snapshot of progress at some point in time.
- **Loader**, which supports determinate and indeterminate modes. Determinate loaders dynamically approach a maximum; indeterminate loaders loop infinitely.

Use a meter when you want to show precise progress alongside a health status (e.g., amount of disk space used). Use loaders when you want to show progress towards completion or ongoing activity (e.g., file upload progress).

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
| `status?`          | `'healthy'` \| `'warning'` \| `'error'`                                                        |             | meter only                     | Status color for meter type indicating health or error state.                                                                              |
| `variant?`         | `'info'` \| `'success'` \| `'warning'` \| `'error'`                                            | `'info'`    | loader only                    | Color variant for loader type. Animation is only available for `'info'` or `'success'` variants.                                           |
| `isIndeterminate?` | `boolean`                                                                                      | `false`     | loader only                    | When `true`, shows an infinite looping animation along the bar.                                                                            |
| `enableAnimation?` | `boolean`                                                                                      | `false`     | determinate loader only        | When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. |
