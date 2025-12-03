---
'@lg-templates/delete-wizard': minor
---

Initial release of `DeleteWizard`.

```tsx
<DeleteWizard
  onStepChange={...}
  onCancel={...}
  onDelete={...}
>
  <DeleteWizard.Header
    pageTitle="Demo Delete Wizard"
  />
  <DeleteWizard.Step requiresAcknowledgement>
    <DeleteWizard.StepContent>
      <div>Step 1 contents<div>
    </DeleteWizard.StepContent>
    <DeleteWizard.Footer
      backButtonText="Go back"
      cancelButtonText="Cancel flow"
      primaryButtonText='Continue to next step'
    />
  </DeleteWizard.Step>

  <DeleteWizard.Step requiresAcknowledgement>
    <DeleteWizard.StepContent>
      <div>Step 2 contents<div>
    </DeleteWizard.StepContent>
    <DeleteWizard.Footer
      backButtonText="Go back"
      cancelButtonText="Cancel flow"
      primaryButtonText='Delete my thing'
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
Like the basic `Wizard.Step`,  of `requiresAcknowledgement` is true, the step must have `isAcknowledged` set in context, (or passed in as a controlled prop) for the Footer's primary button to be enabled. (see the Wizard and DeleteWizard demos in Storybook)


### DeleteWizard.StepContent
A styled `div` for use inside a `DeleteWizard.Step` to ensure proper page scrolling and footer positioning

### DeleteWizard.Footer
A wrapper around `Wizard.Footer` with embedded styles and convenience props for the DeleteWizard template. 
`DeleteWizard.Footer` accepts optional `backButtonText`, `cancelButtonText` and `primaryButtonText` props for simpler wizard creation. 
The primary button variant is defined based on the `activeStep`— `"danger"` for the final steps, and `"primary"` for all preceding steps.
Also defines the `leftGlyph` to <TrashIcon /> for the final step.

You can override this behavior by providing the button props object (see FormFooter).

Use the top level `onDelete`, `onCancel` and `onStepChange` callbacks to handle footer button clicks.