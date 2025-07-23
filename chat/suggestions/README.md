# Suggestion Card

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/suggestions.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/suggestions/live-example/)

## Installation

### PNPM

```shell
pnpm add @lg-chat/suggestions
```

### Yarn

```shell
yarn add @lg-chat/suggestions
```

### NPM

```shell
npm install @lg-chat/suggestions
```

## Example

```tsx
import { SuggestedActions, Status } from '@lg-chat/suggestions';

const configurationParameters = [
  { key: 'Cluster Tier', value: 'M10 ($9.00/month)' },
  { key: 'Provider', value: 'AWS / N. Virginia (us-east-1)' },
  { key: 'Storage', value: '10 GB' },
  { key: 'RAM', value: '2 GB' },
  { key: 'vCPUs', value: '2 vCPUs' },
];

// Basic suggestion card with apply button
<SuggestedActions
  status={Status.Apply}
  configurationParameters={configurationParameters}
  onClickApply={() => console.log('Apply clicked')}
/>

// Success state with applied parameters
<SuggestedActions
  status={Status.Success}
  configurationParameters={[
    { key: 'Cluster Tier', value: 'M10 ($9.00/month)' }, // still applying
    { key: 'Provider', value: 'AWS / N. Virginia (us-east-1)' },
    { key: 'Cloud Provider & Region', value: 'AWS / N. Virginia (us-east-1)', status: Status.Success },
    { key: 'Cluster Tier', value: 'M10 ($9.00/month)', status: Status.Success },
  ]}
  onClickApply={() => console.log('Apply clicked')}
/>

// Error state with failed parameters
<SuggestedActions
  status={Status.Error}
  configurationParameters={[
    { key: 'Cluster Tier', value: 'M30 ($31.00/month)' }, // still applying
    { key: 'Provider', value: 'GCP / Iowa (us-central1)' },
    { key: 'Cloud Provider & Region', value: 'GCP / Iowa (us-central1)', status: Status.Error },
    { key: 'Cluster Tier', value: 'M30 ($31.00/month)', status: Status.Error },
  ]}
  onClickApply={() => console.log('Apply clicked')}
/>
```

## Status Types

The `Status` enum provides the following options:

| Status    | Value       | Description                                            |
| --------- | ----------- | ------------------------------------------------------ |
| `Apply`   | `'apply'`   | Shows configuration suggestions with an "Apply" button |
| `Success` | `'success'` | Shows success banner with applied parameters           |
| `Error`   | `'error'`   | Shows error banner with failed parameters              |

## Configuration Parameters

Each configuration parameter is an object with the following structure:

```tsx
interface ConfigurationParameter {
  key: string; // The parameter name
  value: string; // The parameter value
  status?: Status; // The parameter status (defaults to 'apply')
}
```

The component automatically filters and displays parameters based on their status:

- **Table**: Shows parameters with `apply` status (or no status)
- **Success Banner**: Shows parameters with `success` status
- **Error Banner**: Shows parameters with `error` status

## Properties

| Prop                      | Type                      | Description                                                                                    | Default |
| ------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| `status`                  | `Status`                  | Determines the current state and rendering behavior of the suggestion card                     |         |
| `configurationParameters` | `ConfigurationParameters` | Array of configuration parameters, each with key, value, and optional status                   |         |
| `onClickApply`            | `() => void`              | Callback fired when the user clicks the "Apply" button (shown when `status` is `Status.Apply`) |         |
| `darkMode`                | `boolean`                 | Determines if the component is rendered in dark mode                                           | `false` |
| `...`                     | `HTMLElementProps<'div'>` | Props spread on root element                                                                   |         |
