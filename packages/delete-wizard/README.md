# Delete Wizard

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/delete-wizard.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/delete-wizard/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/delete-wizard
```

### Yarn

```shell
yarn add @leafygreen-ui/delete-wizard
```

### NPM

```shell
npm install @leafygreen-ui/delete-wizard
```

```tsx
<DeleteWizard>
  <DeleteWizard.Header
    pageTitle="Demo Delete Wizard"
  />
  <DeleteWizard.Step requiresAcknowledgement>
    <DeleteWizard.StepContent>
      <div>Step 1 contents<div>
    </DeleteWizard.StepContent>
    <DeleteWizard.Footer
      primaryButtonProps={{
        children: 'Continue to next step',
      }}
    />
  </DeleteWizard.Step>

  <DeleteWizard.Step requiresAcknowledgement>
    <DeleteWizard.StepContent>
      <div>Step 2 contents<div>
    </DeleteWizard.StepContent>
    <DeleteWizard.Footer
      primaryButtonProps={{
        leftGlyph: <TrashIcon />,
        variant: 'danger',
        children: 'Delete my thing',
        onClick: handleDelete,
      }}
    />
  </DeleteWizard.Step>
</DeleteWizard>
```

### DeleteWizard

Establishes a context, and only renders the `activeStep` (managed internally, or provided with the `activeStep` prop). Accepts a `DeleteWizard.Header` and any number of `DeleteWizard.Step`s as children.

`DeleteWizard` and all sub-components include template styling.

### DeleteWizard.Header

A convenience wrapper around `CanvasHeader`

### DeleteWizard.Step

A convenience wrapper around `Wizard.Step` to ensure the correct context.
Like the basic `Wizard.Step`, of `requiresAcknowledgement` is true, the step must have `isAcknowledged` set in context, (or passed in as a controlled prop) for the Footer's primary button to be enabled. (see the Wizard and DeleteWizard demos in Storybook)

### DeleteWizard.StepContent

A styled `div` for use inside a `DeleteWizard.Step` to ensure proper page scrolling and footer positioning

### DeleteWizard.Footer

A wrapper around Wizard.Footer with embedded styles for the DeleteWizard template
