import React from 'react';
import { faker } from '@faker-js/faker';
import { random, sample } from 'lodash';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
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
    controls: {
      exclude: [
        'as',
        'title',
        'description',
        'dismissible',
        'onClose',
        'progress',
        'variant',
      ],
    },
  },
  argTypes: {
    timeout: {
      control: 'number',
      defaultValue: 6000,
      description:
        'Dismiss the Toast after `timeout` milliseconds. If timeout is `null | 0`, the Toast will never dismiss automatically.',
    },
  },
});

const BasicChildren = ({ timeout }: Partial<InternalToastProps>) => {
  const { pushToast, clearStack } = useToast();

  return (
    <div
      className={css`
        display: flex;
        gap: 8px;
      `}
    >
      <Button
        data-testid="toast-trigger"
        onClick={() => {
          const variant = sample(Variant);
          pushToast({
            title: `I'm a ${variant} toast`,
            description: faker.lorem.lines(random(1, 2)),
            variant,
            timeout,
          });
        }}
      >
        Push toast
      </Button>
      <Button onClick={() => clearStack()}>Clear all</Button>
    </div>
  );
};

export const Basic = (toastProps: Partial<InternalToastProps>) => {
  return (
    <ToastProvider>
      <BasicChildren {...toastProps} />
    </ToastProvider>
  );
};
