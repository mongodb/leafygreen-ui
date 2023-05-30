# Loading Indicator

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/loading-indicator.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/loading-indicator/example/)

## Installation

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

| Prop            | Type            | Description                                                            | Default            |
| --------------- | --------------- | ---------------------------------------------------------------------- | ------------------ |
| `displayOption` | `DisplayOption` | Determines the size or orientation of the spinner and description text | `default-vertical` |
| `description`   | `string`        | Description text                                                       | `-`                |

## BlobLoader

```
<BlobLoader
  description=”Loading…”
/>
```

| Prop          | Type     | Description      | Default |
| ------------- | -------- | ---------------- | ------- |
| `description` | `string` | Description text | `-`     |
