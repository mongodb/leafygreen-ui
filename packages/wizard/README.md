# Wizard

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/wizard.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/wizard/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/wizard
```

### Yarn

```shell
yarn add @leafygreen-ui/wizard
```

### NPM

```shell
npm install @leafygreen-ui/wizard
```

```tsx
<Wizard>
  <Wizard.Step>
    <div>Step 1 contents<div>
    <Wizard.Footer
      primaryButtonProps={{
        children: 'Continue',
        variant: 'primary'
      }}
    />
  </Wizard.Step>

  <Wizard.Step requiresAcknowledgement>
    <div>Step 2 contents<div>
    <Wizard.Footer
      primaryButtonProps={{
        children: 'Delete',
        variant: 'danger'
      }}
    />
  </Wizard.Step>
</Wizard>
```

### Wizard

The `Wizard` component establishes a context with an internal state, and will render only the `activeStep`.

You can also control the Wizard externally using the `activeStep` and `onStepChange` callback.

```tsx
<Wizard
  activeStep={0}
  onStepChange={() => {
    /* do something */
  }}
/>
```

Note: When the `activeStep` is externally controlled, ensure that the provided `activeStep` index is valid relative to the count of steps available. If the zero-indexed `activeStep` value exceeds the count of steps provided (or is negative), nothing will render inside the Wizard. (i.e. passing `activeStep={2}` to a Wizard with only 2 steps, nothing will render)

### Wizard.Step

Defines a discrete step in the wizard. Only the step matching the internal (or provided) `activeStep` index will be displayed.

Both `Wizard` and `Wizard.Step` are only wrapped in a `Fragment` to allow for more versatile styling.

#### `requiresAcknowledgement`

If `requiresAcknowledgement` is true, the step must be acknowledged for the Footer's primary button to be enabled. By default (or when explicitly set to `false`) the primary button will always be enabled.

To set a step to be acknowledged, call `setIsAcknowledged` provided from the `useWizardStepContext` hook.
e.g.

```tsx
// App.tsx
<Wizard.Step requiresAcknowledgement>
  <MyWizardStepContents />
  <Wizard.Footer
    primaryButtonProps={{
      children: 'Delete', // This button will be disabled until the step has been acknowledged
    }}
  />
</Wizard.Step>;

// MyWizardStepContents.tsx
const MyWizardStepContents = () => {
  const { isAcknowledged, setAcknowledged } = useWizardStepContext();

  return (
    <>
      <Checkbox
        label="Acknowledge"
        checked={isAcknowledged}
        onChange={e => setAcknowledged(e.target.checked)}
      />
    </>
  );
};
```

### Wizard.Footer

The `Wizard.Footer` is a convenience wrapper around the `FormFooter` component. Each step should render its own Footer component
