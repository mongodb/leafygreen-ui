import React from 'react';
import { sample } from 'lodash';

import Button from '@leafygreen-ui/button';
import { StoryMeta } from '@leafygreen-ui/lib';

import { InternalToast, InternalToastProps } from '../InternalToast';
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

const BasicChildren = (toastProps: Partial<InternalToastProps>) => {
  const { pushToast } = useToast();

  return (
    <Button
      data-testid="toast-trigger"
      onClick={() => {
        const variant = sample(Variant);
        pushToast({
          title: `I'm a ${variant} toast`,
          variant,
          ...toastProps,
        });
      }}
    >
      Push toast
    </Button>
  );
};

export const Basic = (toastProps: Partial<InternalToastProps>) => {
  return (
    <ToastProvider>
      <BasicChildren {...toastProps} />
    </ToastProvider>
  );
};
