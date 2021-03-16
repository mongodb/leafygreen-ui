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
  <Step>Step 1</Step>
  <Step>Step 2</Step>
</Stepper>
```

**Output HTML**

```html
<div aria-label="breadcrumbs" class="leafygreen-ui-13pcgvz">
  <div class="leafygreen-ui-plizcc">
    <div
      class="leafygreen-ui-1cyt2ch"
      aria-label="Step 1"
      aria-current="step"
      step="0"
    >
      <div class="leafygreen-ui-7uty9f">
        <div class="leafygreen-ui-gbxl1s">1</div>
      </div>
      Step 1
      <div class="leafygreen-ui-1d8yxum">
        <span class="leafygreen-ui-1tyue0g"><div></div></span>
        <span class="leafygreen-ui-s0bv6u"><div></div></span>
      </div>
    </div>
    <div class="leafygreen-ui-15p2xzb" aria-label="Step 2" step="1">
      <div class="leafygreen-ui-9u2rvb">
        <div class="leafygreen-ui-gbxl1s">2</div>
      </div>
      Step 2
      <div class="leafygreen-ui-1d8yxum">
        <span class="leafygreen-ui-1tyue0g"><div></div></span>
        <span class="leafygreen-ui-s0bv6u"><div></div></span>
      </div>
    </div>
  </div>
</div>
```

## Properties

| Prop                | Type           | Description                                                      | Default           |
| ------------------- | -------------- | ---------------------------------------------------------------- | ----------------- |
| `children`          | `StepElements` | Strings wrapped in `<Step></Step>` to display as each step       |                   |
| `currentStep`       | `number`       | Starting at 0, index of current step that should be highlighted. |                   |
| `maxDisplayedSteps` | `number`       | Maximum number of steps displayed a time. The rest are hidden.   | `children.length` |
