# Stepper

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/stepper.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/stepper/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/stepper
```

### Yarn

```shell
yarn add @leafygreen-ui/stepper
```

### NPM

```shell
npm install @leafygreen-ui/stepper
```

## Example

```js
<Stepper currentStep={0} maxDisplayedSteps={2}>
  <div>Step 1</div>
  <div>Step 2</div>
</Stepper>
```

or

```js
<Stepper currentStep={0} maxDisplayedSteps={2}>
  <Step>Step 1</Step>
  <Step>Step 2</Step>
</Stepper>
```

## Properties

| Prop                  | Type              | Description                                                                                            | Default           |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ | ----------------- |
| `children`            | `React.ReactNode` | ReactNode to display as the children of each step                                                      |                   |
| `currentStep`         | `number`          | Starting at 0, index of current step that should be highlighted.                                       |                   |
| `maxDisplayedSteps`   | `number`          | Maximum number of steps displayed a time. The rest are hidden.                                         | `children.length` |
| `completedStepsShown` | `number`          | Number of completed steps shown before the `currentStep`. The ellipses step is included in this count. | 1                 |
| `className`           | `string`          | className applied to the root element                                                                  |                   |
