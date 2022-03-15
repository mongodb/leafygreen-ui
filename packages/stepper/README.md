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

**Output HTML**

```html
<ol class="leafygreen-ui-1pvgjhr">
  <li>
    <div class="leafygreen-ui-1utybxd" aria-label="step1" aria-current="step">
      <div class="lg-ui-step-icon leafygreen-ui-1rv12ay">
        <div class="leafygreen-ui-11fjm0v">1</div>
      </div>
      <div class="lg-ui-step-label leafygreen-ui-77vd0k">
        <div>Step 1</div>
      </div>
    </div>
  </li>
  <li>
    <div class="leafygreen-ui-1q7k9qe" aria-label="step2" aria-current="false">
      <div class="lg-ui-step-icon leafygreen-ui-1ch160a">
        <div class="leafygreen-ui-11fjm0v">2</div>
      </div>
      <div class="lg-ui-step-label leafygreen-ui-gtf36y">
        <div>Step 2</div>
      </div>
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
