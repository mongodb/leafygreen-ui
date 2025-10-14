# Feature Walls

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/feature-walls.svg)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/feature-walls
```

### Yarn

```shell
yarn add @leafygreen-ui/feature-walls
```

### NPM

```shell
npm install @leafygreen-ui/feature-walls
```

## Example

### ActivationSteps

```tsx
import Button, { Size, Variant } from `@leafygreen-ui/button`;
import { ActivationSteps } from `@leafygreen-ui/feature-walls`;

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    {
      title: 'Step 1'
      description: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur nunc mattis magna pretium, id mattis metus vestibulum. Integer cursus ex ante, ut molestie lorem vestibulum id.
          {' '}
          <Link href="https://www.mongodb.design/">{`I'm a link`}</Link>
        </>
      ),
      actions={
        <Button
          onClick={handleNext}
          size={Size.Small}
        >
          Primary button
        </Button>
      }
    },
    {
      title: 'Step 2'
      description:
        'In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      actions={
        <>
          <Button
            onClick={handleBack}
            size={Size.Small}
          >
            Secondary button
          </Button>
          <Button
            onClick={handleNext}
            size={Size.Small}
            variant={Variant.Primary}
          >
            Primary button
          </Button>
        </>
      }
    },
    {
      title: 'Step 3'
      description:
        'In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis.',
      media: <img alt="Test" src="https://placehold.co/170x100" />,
      actions={
        <>
          <Button
            onClick={handleBack}
            size={Size.Small}
          >
            Secondary button
          </Button>
          <Button
            onClick={handleNext}
            size={Size.Small}
            variant={Variant.Primary}
          >
            Primary button
          </Button>
        </>
      }
    },
  ];

  <ActivationSteps
    completedMessage="You did it!"
    title="Lorem ipsum title"
    steps={steps}
  />
```

### FeatureOverview

```tsx
import { FeatureOverview } from `@leafygreen-ui/feature-walls`;

  const features = [
    {
      title: 'Feature 1',
      description: 'Description for feature 1',
      media: <img alt="Media 1" src="example1.png" />
    },
    {
      title: 'Feature 2',
      description: 'Description for feature 2',
      media: <img alt="Media 2" src="example2.png" />
    },
    {
      title: 'Feature 3',
      description: 'Description for feature 3',
      media: <img alt="Media 3" src="example3.png" />
    },
  ];

  <FeatureOverview
    title="Lorem ipsum title"
    features={features}
  />
```

### Header

```tsx
import { Header } from `@leafygreen-ui/feature-walls`;
import ArrowRight from '@leafygreen-ui/icon/dist/ArrowRight';

  <Header
    title="Lorem ipsum title"
    subtitle="Lorem ipsum subtitle"
    description="Lorem ipsum description"
    primaryButtonProps={{ children: 'Primary CTA' }}
    secondaryButtonProps={{
      children: 'Secondary CTA',
      leftGlyph: <ArrowRight />
    }}
  />
```

### InfoBlock

```tsx
import { InfoBlock, Variant } from `@leafygreen-ui/feature-walls`;

  <InfoBlock
    variant={Variant.Card}
    media={<img />}
    label="Lorem ipsum label"
    description="Lorem ipsum description"
    buttonProps={{ children: 'CTA Button' }}
    badgeProps={{ children: 'TAG' }}
  />

  <InfoBlock
    variant={Variant.Icon}
    media={<svg />}
    label="Lorem ipsum label"
    description="Lorem ipsum description"
  />

  <InfoBlock
    variant={Variant.Image}
    media={<svg />}
    label="Lorem ipsum label"
    description="Lorem ipsum description"
    buttonProps={{ children: 'CTA Button' }}
    badgePropsArray={[{ children: 'TAG1' }, { children: 'TAG2' }]}
  />
```

### Section

```tsx
import { Section } from `@leafygreen-ui/feature-walls`;

  <Section
    title="Lorem ipsum title"
    renderInCard
  >
    {children}
  </Section>
```

### Templates

```tsx
import { Templates } from `@leafygreen-ui/feature-walls`;

  const templates = [
    {
      media: <img alt="Media 1" src="example1.png" />
      label: 'Template 1',
      description: 'Description for template 1',
      badgePropsArray: [
        { children: 'TAG1' },
        { children: 'TAG2' },
        { children: 'TAG3' },
      ],
      buttonProps: {
        children: 'Use template 1',
      },
    },
    {
      media: <img alt="Media 2" src="example2.png" />
      label: 'Template 2',
      description: 'Description for template 2',
      badgePropsArray: [
        { children: 'TAG3' },
      ],
      buttonProps: {
        children: 'Use template 2',
      },
    },
    {
      media: <img alt="Media 3" src="example1.png" />
      label: 'Template 3',
      description: 'Description for template 3',
      badgePropsArray: [
        { children: 'TAG1' },
        { children: 'TAG2' },
      ],
      buttonProps: {
        children: 'Use template 3',
      },
    },
  ];

  <Templates
    title="Lorem ipsum title"
    templates={templates}
  />
```

### UseCases

```tsx
import { UseCases } from `@leafygreen-ui/feature-walls`;

  const cases = [
    {
      media: <svg />,
      label: 'Use case 1',
      description: 'Description for use case 1',
    },
    {
      media: <svg />,
      label: 'Use case 2',
      description: 'Description for use case 2'
    },
    {
      media: <svg />,
      label: 'Use case 3',
      description: 'Description for use case 3',
    },
  ];

  <UseCases
    maxColumns={3}
    title="Lorem ipsum title"
    cases={cases}
  />
```

## Properties

### ActivationSteps

| Prop               | Type                    | Description                                                                          | Default                         |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| `completedMessage` | `string`                | Optional text that renders at the bottom of the section when all steps are completed | `"You've completed all steps!"` |
| `darkMode`         | `boolean`               | Determines if the component renders in dark mode                                     | `false`                         |
| `steps`            | `Array<ActivationStep>` | Required array of activationStep objects                                             |                                 |
| `title`            | `string`                | Required title text                                                                  |                                 |

#### ActivationStep

| Prop          | Type                 | Description                                                                         | Default |
| ------------- | -------------------- | ----------------------------------------------------------------------------------- | ------- |
| `description` | `React.ReactNode`    | Required description of the step. This will render below the title                  |         |
| `media`       | `React.ReactElement` | Optional image to the right of the text. This is typically an image or illustration |         |
| `actions`     | `React.ReactNode`    | Optional buttons that will render below the text.                                   |         |
| `title`       | `string`             | Required title of the step                                                          |         |

### FeatureOverview

| Prop       | Type             | Description                                      | Default |
| ---------- | ---------------- | ------------------------------------------------ | ------- |
| `darkMode` | `boolean`        | Determines if the component renders in dark mode | `false` |
| `title`    | `string`         | Required title text                              |         |
| `features` | `Array<Feature>` | Required array of feature objects                |         |

#### Feature

| Prop          | Type                 | Description                                                                                                                 | Default |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------- |
| `title`       | `string`             | Required title text that renders in an `AccordionButton`                                                                    |         |
| `description` | `React.ReactNode`    | Required description that renders in an `AccordionPanel` when feature index is selected                                     |         |
| `media`       | `React.ReactElement` | Required element, typically an image or illustration that renders in a separate container adjacent to the Accordion content |         |
| `onExpand`    | `function`           | Optional callback that is fired when the feature is expanded                                                                |         |

### Header

| Prop                   | Type                                                           | Description                                                                                                                                                                                                                                        | Default |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `darkMode`             | `boolean`                                                      | Determines if the component renders in dark mode                                                                                                                                                                                                   | `false` |
| `title`                | `string`                                                       | Required title text                                                                                                                                                                                                                                |         |
| `subtitle`             | `string`                                                       | Optional subtitle text that renders above the title                                                                                                                                                                                                |         |
| `description`          | `React.ReactNode`                                              | Optional description text that renders below the description                                                                                                                                                                                       |         |
| `primaryButtonProps`   | `Omit<ButtonProps, 'variant'> & { children: React.ReactNode }` | An object that accepts all `Button` props but `variant` prop is limited to `primary`. If `secondaryButtonProps` is `undefined`, this button will be center aligned. darkMode is handled internally so you do not have to pass the `darkMode` prop. |         |
| `secondaryButtonProps` | `Omit<ButtonProps, 'variant'> & { children: React.ReactNode }` | An object that accepts all `Button` props but `variant` prop is limited to `default`. darkMode is handled internally so you do not have to pass the `darkMode` prop.                                                                               |         |

### InfoBlock

| Prop              | Type                                 | Description                                                                                                                                                                                                                                                                                                                                | Default  |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `darkMode`        | `boolean`                            | Determines if the component renders in dark mode                                                                                                                                                                                                                                                                                           | `false`  |
| `badgeProps`      | `Omit<BadgeProps, 'variant'>`        | When `variant='card'`, this optional prop will accept an object that accepts all `Badge` props but badge `variant` prop is limited to `default`. This prop cannot be used when `variant='icon'` or `variant='image'`                                                                                                                       |          |
| `badgePropsArray` | `Array<Omit<BadgeProps, 'variant'>>` | When `variant='image'`, this optional prop will accept an array of objects that accept all `Badge` props but badge `variant` prop is limited to `default`. This prop cannot be used when `variant='card'` or `variant='icon'`                                                                                                              |          |
| `buttonProps`     | `ButtonProps`                        | An optional object that accepts all `Button` props. darkMode is handled internally so you do not have to pass the `darkMode` prop                                                                                                                                                                                                          |          |
| `description`     | `React.ReactNode`                    | Optional description text that renders below the description                                                                                                                                                                                                                                                                               |          |
| `label`           | `string`                             | Required label text                                                                                                                                                                                                                                                                                                                        |          |
| `media`           | `React.ReactElement`                 | Optional image or icon element <br> _ When `variant='card'`, `media` is typically an image <br> _ When `variant='icon'`, `media` is typically an icon <br> \* When `variant='image'`, `media` is typically an illustration                                                                                                                 |          |
| `variant`         | `'card' \| 'icon' \| 'image'`        | An optional enum that determines the component UI <br> _ `card`: `media` and text will render in a joint card, and a badge will render above the `label` <br> _ `icon`: `media` will render above the text, and badges will not render <br> \* `image`: `media` will render above the text, and badges will render below the `description` | `'card'` |

### Section

| Prop           | Type      | Description                                      | Default |
| -------------- | --------- | ------------------------------------------------ | ------- |
| `darkMode`     | `boolean` | Determines if the component renders in dark mode | `false` |
| `renderInCard` | `boolean` | Optional boolean to render section in a Card UI  | `false` |
| `title`        | `string`  | Required title text                              |         |

### Templates

| Prop        | Type              | Description                                      | Default |
| ----------- | ----------------- | ------------------------------------------------ | ------- |
| `darkMode`  | `boolean`         | Determines if the component renders in dark mode | `false` |
| `title`     | `string`          | Required title text                              |         |
| `templates` | `Array<Template>` | Required array of template objects               |         |

#### Template

| Prop              | Type                                 | Description                                                                                                                       | Default |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `badgePropsArray` | `Array<Omit<BadgeProps, 'variant'>>` | Optional prop that accepts an array of objects that accept all `Badge` props but badge `variant` prop is limited to `default`     |         |
| `buttonProps`     | `ButtonProps`                        | An optional object that accepts all `Button` props. darkMode is handled internally so you do not have to pass the `darkMode` prop |         |
| `description`     | `React.ReactNode`                    | Optional description text that renders below the description                                                                      |         |
| `label`           | `string`                             | Required label text                                                                                                               |         |
| `media`           | `React.ReactElement`                 | Required image element, typically an illustration                                                                                 |         |

### UseCases

| Prop         | Type             | Description                                                    | Default |
| ------------ | ---------------- | -------------------------------------------------------------- | ------- |
| `darkMode`   | `boolean`        | Determines if the component renders in dark mode               | `false` |
| `maxColumns` | `2 \| 3 \| 4`    | Determines the maximum number of columns the grid should allow |         |
| `title`      | `string`         | Required title text                                            |         |
| `cases`      | `Array<UseCase>` | Required array of useCase objects                              |         |

#### UseCase

| Prop          | Type                 | Description                                                  | Default |
| ------------- | -------------------- | ------------------------------------------------------------ | ------- |
| `description` | `React.ReactNode`    | Optional description text that renders below the description |         |
| `label`       | `string`             | Required label text                                          |         |
| `media`       | `React.ReactElement` | Required svg element, typically an icon                      |         |
