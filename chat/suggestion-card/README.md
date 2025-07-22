# Suggestion Card

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/suggestion-card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/suggestion-card/live-example/)

## Installation

### PNPM

```shell
pnpm add @lg-chat/suggestion-card
```

### Yarn

```shell
yarn add @lg-chat/suggestion-card
```

### NPM

```shell
npm install @lg-chat/suggestion-card
```

## Example

```tsx
import { SuggestionCard, Status } from '@lg-chat/suggestion-card';

const configurationParameters = {
  'Cluster Tier': 'M10 ($9.00/month)',
  'Provider': 'AWS / N. Virginia (us-east-1)',
  'Storage': '10 GB',
  'RAM': '2 GB',
  'vCPUs': '2 vCPUs',
};

const appliedParameters = {
  'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
  'Cluster Tier': 'M10 ($9.00/month)',
};

// Basic suggestion card
<SuggestionCard
  status={Status.Unset}
  suggestedConfigurationParameters={configurationParameters}
  onClickApply={() => console.log('Apply clicked')}
/>

// With apply button
<SuggestionCard
  status={Status.Apply}
  suggestedConfigurationParameters={configurationParameters}
  onClickApply={() => console.log('Apply clicked')}
/>

// Success state with applied parameters
<SuggestionCard
  status={Status.Success}
  suggestedConfigurationParameters={configurationParameters}
  appliedParameters={appliedParameters}
  onClickApply={() => console.log('Apply clicked')}
/>

// Error state with failed parameters
<SuggestionCard
  status={Status.Error}
  suggestedConfigurationParameters={configurationParameters}
  failedParameters={appliedParameters}
  onClickApply={() => console.log('Apply clicked')}
/>
```

## Status Types

The `Status` enum provides the following options:

| Status    | Value       | Description                                                           |
| --------- | ----------- | --------------------------------------------------------------------- |
| `Unset`   | `'unset'`   | Default state showing configuration suggestions only                  |
| `Apply`   | `'apply'`   | Shows configuration suggestions with an "Apply" button                |
| `Success` | `'success'` | Shows success banner with applied parameters from `appliedParameters` |
| `Error`   | `'error'`   | Shows error banner with failed parameters from `failedParameters`     |

## Properties

| Prop                               | Type                      | Description                                                                                              | Default |
| ---------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------- | ------- |
| `status`                           | `Status`                  | Determines the current state and rendering behavior of the suggestion card                               |         |
| `suggestedConfigurationParameters` | `ConfigurationParameters` | Configuration parameters displayed in the main table as string key-value pairs                           |         |
| `onClickApply`                     | `() => void`              | Callback fired when the user clicks the "Apply" button (shown when `status` is `Status.Apply`)           |         |
| `appliedParameters`                | `ConfigurationParameters` | Parameters that were successfully applied, displayed in success banner when `status` is `Status.Success` |         |
| `failedParameters`                 | `ConfigurationParameters` | Parameters that failed to apply, displayed in error banner when `status` is `Status.Error`               |         |
| `darkMode`                         | `boolean`                 | Determines if the component is rendered in dark mode                                                     | `false` |
| `...`                              | `HTMLElementProps<'div'>` | Props spread on root element                                                                             |         |
