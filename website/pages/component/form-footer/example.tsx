import React from 'react';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import FormFooter from '@leafygreen-ui/form-footer';

const knobsConfig: KnobsConfigInterface<{
  primaryButtonText: string;
  cancelButtonText?: string;
  backButtonText?: string;
  errorMessage?: string;
  darkMode: boolean;
}> = {
  primaryButtonText: {
    type: 'text',
    default: 'Save Draft',
    label: 'Primary button text',
  },
  cancelButtonText: {
    type: 'text',
    default: 'Cancel',
    label: 'Cancel button text',
  },
  backButtonText: {
    type: 'text',
    default: '',
    label: 'Back button text',
  },
  errorMessage: {
    type: 'text',
    default: "There's an error on this page.",
    label: 'Error message',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
};

export default function CardLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({
        primaryButtonText,
        cancelButtonText,
        backButtonText,
        errorMessage,
      }) => (
        <FormFooter
          primaryButton={{
            text: primaryButtonText,
          }}
          cancelButtonText={cancelButtonText}
          backButtonText={backButtonText}
          errorMessage={errorMessage}
        />
      )}
    </LiveExample>
  );
}
