# Loading Indicator

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/loading-indicator.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/loading-indicator/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/loading-indicator
```

### Yarn

```shell
yarn add @leafygreen-ui/loading-indicator
```

### NPM

```shell
npm install @leafygreen-ui/loading-indicator
```

## Spinner

```
<Spinner
  variant="large"
  description=”Loading…”
/>
```

| Prop   | Type               | Description                        | Default   |
| ------ | ------------------ | ---------------------------------- | --------- |
| `size` | `Size` or `number` | Determines the size of the spinner | `default` |

## BlobLoader

```
<BlobLoader
  description=”Loading…”
/>
```

| Prop          | Type     | Description      | Default |
| ------------- | -------- | ---------------- | ------- |
| `description` | `string` | Description text | `-`     |
