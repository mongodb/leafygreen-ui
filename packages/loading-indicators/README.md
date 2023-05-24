# Loading Indicators

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/loading-indicators.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/loading-indicators/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/loading-indicators
```

### NPM

```shell
npm install @leafygreen-ui/loading-indicators
```

## Spinner

```
<Spinner
  variant="large"
  description=”Loading…”
/>
```

| Prop           | Type      | Description                                                                        | Default   |
| -------------- | --------- | ---------------------------------------------------------------------------------- | --------- |
| `variant`      | `Variant` | Determines the size or orientation of the spinner and description text             | `default` |
| `description`  | `string`  | Description text                                                                   | `-`       |
| `sizeOverride` | `number`  | An override for the spinner animation’s size in pixels. Intended for internal use. | `-`       |

## BlobLoader

```
<BlobLoader
  description=”Loading…”
/>
```

| Prop          | Type     | Description      | Default |
| ------------- | -------- | ---------------- | ------- |
| `description` | `string` | Description text | `-`     |
