import React from 'react';

import Button from '@leafygreen-ui/button';
import { StoryMeta } from '@leafygreen-ui/lib';

import Toast from '../Toast/Toast';

import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

export default StoryMeta<typeof Toast>({
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    default: 'Basic',
  },
});

const BasicChildren = () => {
  const { pushToast } = useToast();

  return (
    <Button
      onClick={() => {
        pushToast({
          title: "I'm a toast",
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
