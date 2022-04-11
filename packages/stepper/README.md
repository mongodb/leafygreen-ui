# Stepper

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/stepper.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/stepper/example/)

## Installation

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

**Output HTML**

```html
<ol class="leafygreen-ui-1pvgjhr" aria-label="progress">
  <li>
    <div class="leafygreen-ui-1x8f1m7" aria-label="step1" aria-current="step">
      <div class="lg-ui-03f12bfd leafygreen-ui-1dyv85w">
        <div class="leafygreen-ui-17xqetg">1</div>
      </div>
      <p class="lg-ui-d036aa4e leafygreen-ui-1u866nc">Step 1</p>
    </div>
  </li>
  <li>
    <div class="leafygreen-ui-1x8f1m7" aria-label="step2" aria-current="false">
      <div class="lg-ui-03f12bfd leafygreen-ui-1oypnhq">
        <div class="leafygreen-ui-17xqetg">2</div>
      </div>
      <p class="lg-ui-d036aa4e leafygreen-ui-1uk291k">Step 2</p>
    </div>
  </li>
</ol>
```

## Properties

| Prop                  | Type              | Description                                                                                            | Default           |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ | ----------------- |
| `children`            | `React.ReactNode` | ReactNode to display as the children of each step                                                      |                   |
| `currentStep`         | `number`          | Starting at 0, index of current step that should be highlighted.                                       |                   |
| `maxDisplayedSteps`   | `number`          | Maximum number of steps displayed a time. The rest are hidden.                                         | `children.length` |
| `completedStepsShown` | `number`          | Number of completed steps shown before the `currentStep`. The ellipses step is included in this count. | 1                 |
| `className`           | `string`          | className applied to the root element                                                                  |                   |
