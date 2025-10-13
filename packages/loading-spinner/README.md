# Loading Spinner

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/loading-spinner.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/loading-spinner/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/loading-spinner
```

### Yarn

```shell
yarn add @leafygreen-ui/loading-spinner
```

### NPM

```shell
npm install @leafygreen-ui/loading-spinner
```

## Overview

A lightweight SVG-based spinning loading indicator component. **Prefer using this package over `@leafygreen-ui/loading-indicator` when bundle size matters**, as this component does not import the heavy Lottie animation library.

The `LoadingSpinner` uses pure CSS animations with SVG `stroke-dasharray` and `stroke-dashoffset` transitions to create a smooth circular loading animation, resulting in a much smaller bundle size compared to the Lottie-based alternative.

## Example

```tsx
import { LoadingSpinner } from '@leafygreen-ui/loading-spinner';

// Basic usage
<LoadingSpinner />

// With custom size
<LoadingSpinner size="large" />

// With custom size in pixels
<LoadingSpinner size={100} />
```

## Properties

| Prop        | Type                           | Description                                                                               | Default                |
| ----------- | ------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------- |
| `size`      | `LoadingSpinnerSize \| number` | The size of the spinner. Accepts a standard size enum value or a custom number in pixels. | `'default'`            |
| `darkMode`  | `boolean`                      | Determines whether the component renders in dark mode.                                    | `false`                |
| `className` | `string`                       | Adds a className to the root element.                                                     |                        |
| `data-lgid` | `string`                       | Custom data-lgid attribute for testing purposes.                                          | `'lg-loading_spinner'` |

### Size Options

- `xsmall`
- `small`
- `default`
- `large`
- `xlarge`

Or provide a custom number in pixels.
