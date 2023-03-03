import React from 'react';
import { faker } from '@faker-js/faker';
import { random, sample } from 'lodash';

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
  const { pushToast, clearStack } = useToast();

  return (
    <>
      <Button
        data-testid="toast-trigger"
        onClick={() => {
          const variant = sample(Variant);
          pushToast({
            title: `I'm a ${variant} toast`,
            description: faker.lorem.lines(random(1, 2)),
            variant,
            ...toastProps,
            timeout: null,
          });
        }}
      >
        Push toast
      </Button>
      <Button onClick={() => clearStack()}>Clear all</Button>
    </>
  );
};

export const Basic = (toastProps: Partial<InternalToastProps>) => {
  return (
    <ToastProvider>
      <BasicChildren {...toastProps} />
    </ToastProvider>
  );
};
