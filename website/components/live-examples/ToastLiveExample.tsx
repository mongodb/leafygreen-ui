import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Toast, { Variant } from '@leafygreen-ui/toast';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  progress: number;
  title: string;
  body: string;
  open: boolean;
  close: boolean;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Success as Variant,
    label: 'Variant',
  },
  progress: {
    type: 'number',
    default: 1,
    label: 'Progress',
  },
  title: {
    type: 'text',
    default: 'Exercitation incididunt ea proident velit mollit',
    label: 'Title',
  },
  body: {
    type: 'text',
    default: 'Velit ea exercitation qui aute dolor proident.',
    label: 'Body',
  },
  open: {
    type: 'boolean',
    default: true,
    label: 'Open',
  },
  close: {
    type: 'boolean',
    default: false,
    label: 'Close',
  },
};

const ToastLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ progress, close, ...rest }) => (
        <Toast
          progress={progress}
          close={close ? () => { } : undefined}
          {...rest}
        />
      )}
    </LiveExample>
  );
};

export default ToastLiveExample;
