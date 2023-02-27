import React from 'react';
import { sample } from 'lodash';

import Button from '@leafygreen-ui/button';
import { StoryMeta } from '@leafygreen-ui/lib';

import { InternalToast } from '../InternalToast';
import { Variant } from '../Toast.types';

import { ToastProvider } from './ToastProvider';
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
      onClick={() => {
        const variant = sample(Variant);
        pushToast({
          title: `I'm a ${variant} toast`,
          variant,
          timeout: null,
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
