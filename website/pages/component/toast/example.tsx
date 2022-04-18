import React from 'react';
import { css } from '@emotion/css';
import Button from '@leafygreen-ui/button';
import Toast, { Variant } from '@leafygreen-ui/toast';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  progress: number;
  close: boolean;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Success as Variant,
    label: 'Variant',
    isRequired: true,
  },
  progress: {
    type: 'number',
    default: 0.5,
    label: 'Progress',
    min: 0,
    max: 1,
    step: 0.01,
  },
  close: {
    type: 'boolean',
    default: false,
    label: 'Close',
  },
};

export default function ToastLiveExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ variant, progress, close, ...rest }) => (
        <>
          <Button onClick={() => setOpen(curr => !curr)}>Trigger toast</Button>
          <Toast
            progress={progress}
            className={css`
              z-index: 1;
            `}
            close={
              close
                ? () => {
                    setOpen(false);
                  }
                : undefined
            }
            open={open}
            variant={variant}
            body={
              variant === 'success'
                ? 'You have successfully linked your MongoDB account LeafyCorp to your GCP account.'
                : 'Currently: capturing backup snapshot'
            }
            title={
              variant === 'success' ? 'Success!' : 'Deploying your change.'
            }
            {...rest}
          />
        </>
      )}
    </LiveExample>
  );
}
