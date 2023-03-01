import React from 'react';
import { sample } from 'lodash';

import Button from '@leafygreen-ui/button';
import { StoryMeta } from '@leafygreen-ui/lib';

import { InternalToast } from '../InternalToast';
import { Variant } from '../Toast.types';

import { ToastProvider } from './ToastContext';
import { useToast } from './useToast';

export default StoryMeta<typeof InternalToast>({
  title: 'Components/Toast',
  component: InternalToast,
  parameters: {
    default: 'Basic',
  },
});

const BasicChildren = () => {
  const { pushToast } = useToast();

  return (
    <Button
      data-testid="toast-trigger"
      onClick={() => {
        const variant = sample(Variant);
        pushToast({
          title: `I'm a ${variant} toast`,
          variant,
        });
      }}
    >
      Push toast
    </Button>
  );
};

export const Basic = () => {
  return (
    <ToastProvider>
      <BasicChildren />
    </ToastProvider>
  );
};
