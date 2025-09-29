# Vertical Stepper

![npm (scoped)](https://img.shields.io/npm/v/@lg-private/vertical-stepper.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/vertical-stepper/example/)

## Installation

### Yarn

```shell
yarn add @lg-private/vertical-stepper
```

### NPM

```shell
npm install @lg-private/vertical-stepper
```

## Example

```js
import Button, { Size, Variant } from `@leafygreen-ui/button`;
import { VerticalStepper, VerticalStep } from `@lg-private/vertical-stepper`;

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
    actions={
      <Button
        onClick={() => setCurrentStep(step => step + 1)}
        size={Size.Small}
      >
        primary button
      </Button>
    }
  />
  <VerticalStep
    title="second step"
    description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
    actions={
      <>
        <Button
          onClick={() => setCurrentStep(step => step - 1)}
          size={Size.Small}
        >
          secondary button
        </Button>
        <Button
          onClick={() => setCurrentStep(step => step + 1)}
          size={Size.Small}
          variant={Variant.Primary}
        >
          primary button
        </Button>
      </>
    }
    media={<img alt="test" src="https://placehold.co/170x85" />}
  />
  <VerticalStep
    title="third step"
    description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis."
    actions={
      <>
        <Button
          onClick={() => setCurrentStep(step => step - 1)}
          size={Size.Small}
        >
          secondary button
        </Button>
        <Button
          onClick={() => setCurrentStep(step => step + 1)}
          size={Size.Small}
          variant={Variant.Primary}
        >
          primary button
        </Button>
      </>
    }
    media={<img alt="test" src="https://placehold.co/170x100" />}
  />
</VerticalStepper>;
```

## Properties

### `<VerticalStepper />`

| Prop        | Type      | Description                                                                                                                                             | Default |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| darkMode    | `boolean` | Determines if the component renders in dark mode                                                                                                        | `false` |
| currentStep | `number`  | Zero-based. The index of the current step that will appear active. All steps will be marked as completed if the currentStep equals the number of steps. | `0`     |
| children    | `string`  | Two or more `<VerticalStep/>` components                                                                                                                |         |

### `<VerticalStep />`

| Prop        | Type              | Description                                                     | Default |
| ----------- | ----------------- | --------------------------------------------------------------- | ------- |
| title       | `string`          | The title of the step.                                          |         |
| description | `React.ReactNode` | The description of the step. This will render below the title.  |         |
| media       | `React.ReactNode` | The image to the right of the text. E.g. `<img />` or `<svg />` |         |
| actions     | `React.ReactNode` | Optional buttons that will render below the text.               |         |
