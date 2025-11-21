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
Note: if you externally control the state, you opt out of the automatic range validation, and you must ensure that the provided `activeStep` index is valid relative to the `Wizard.Step`s provided.

### Wizard.Step

Defines a discrete step in the wizard. Only the step matching the internal (or provided) `activeStep` index will be displayed.

Both `Wizard` and `Wizard.Step` are only wrapped in a `Fragment` to allow for more versatile styling.

#### `requiresAcknowledgement`

If `requiresAcknowledgement` is true, the step must have `isAcknowledged` set in context, (or passed in as a controlled prop) for the Footer's primary button to be enabled.

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
