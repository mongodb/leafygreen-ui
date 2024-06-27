# Vertical Stepper

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/vertical-stepper.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/vertical-stepper/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/vertical-stepper
```

### NPM

```shell
npm install @leafygreen-ui/vertical-stepper
```

## Example

```js
import { VerticalStepper, VerticalStep } from `@leafygreen-ui/vertical-stepper`;

const [currentStep, setCurrentStep] = useState(0);

<VerticalStepper currentStep={currentStep}>
  <VerticalStep
    title="first step"
    description={
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        efficitur nunc mattis magna pretium, id mattis metus vestibulum. Integer
        cursus ex ante, ut molestie lorem vestibulum id.{' '}
        <Link href="https://www.mongodb.design/">Im a link</Link>
      </>
    }
    primaryButtonProps={{
      children: 'primary button',
      onClick: () => setCurrentStep(step => step + 1)
    }}
  />
  <VerticalStep
    title="second step"
    description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
    primaryButtonProps={{
      children: 'primary button',
      onClick: () => setCurrentStep(step => step + 1)
    }}
    secondaryButtonProps={{
      children: 'secondary button',
      onClick: () => setCurrentStep(step => step - 1),
    }}
    media={<img alt="test" src="https://placehold.co/170x85" />}
  />
  <VerticalStep
    title="third step"
    description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis."
    primaryButtonProps={{
      children: 'primary button',
      onClick: () => setCurrentStep(step => step + 1)
    }}
    secondaryButtonProps={{
      children: 'secondary button',
      onClick: () => setCurrentStep(step => step - 1),
    }}
    media={<img alt="test" src="https://placehold.co/170x100" />}
  />
</VerticalStepper>

```

## Properties

### `<VerticalStepper />`

| Prop        | Type      | Description                                                                                                                                             | Default |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| darkMode    | `boolean` | Determines if the component renders in dark mode                                                                                                        | `false` |
| currentStep | `number`  | Zero-based. The index of the current step that will appear active. All steps will be marked as completed if the currentStep equals the number of steps. | `0`     |
| children    | `string`  | Two or more `<VerticalStep/>` components                                                                                                                |         |

### `<VerticalStep />`

| Prop                 | Type                           | Description                                                                                                                                                                                                                                                                                                                        | Default |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| title                | `string`                       | The title of the step.                                                                                                                                                                                                                                                                                                             |         |
| description          | `React.ReactNode`              | The description of the step. This will render below the title.                                                                                                                                                                                                                                                                     |         |
| media                | `React.ReactNode`              | The image to the right of the text. E.g. `<img />` or `<svg />`                                                                                                                                                                                                                                                                    |         |
| primaryButtonProps   | `Omit<ButtonProps, 'variant'>` | The right-most button under the description. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but excludes `variant`. If there is a secondary button, the `variant` is `primary`. If there isn’t a secondary button, the `variant` is `default`. |         |
| secondaryButtonProps | `Omit<ButtonProps, 'variant'>` | The button to the left of the primary button. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but excludes `variant`. The `variant` is always `default`.                                                                                        |         |
