import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { ComponentStory } from '@storybook/react';
import { random, range, sample, startCase } from 'lodash';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { DarkModeProps, StoryMeta } from '@leafygreen-ui/lib';
import { InlineCode, Label } from '@leafygreen-ui/typography';

import { variantIcons } from './InternalToast/VariantIcon';
import { makeToast, makeToastStack } from './ToastContext/utils/makeToast';
import { InternalToast, InternalToastProps } from './InternalToast';
import { ToastProvider, useToast, Variant } from '.';

export default StoryMeta<typeof InternalToast>({
  title: 'Components/Toast',
  component: InternalToast,
  decorators: [
    (Story, meta) => (
      <ToastProvider initialValue={meta.args.initialValue}>
        <Story />
      </ToastProvider>
    ),
  ],
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
      defaultValue: 6_000,
      description:
        'Dismiss the Toast after `timeout` milliseconds. If timeout is `null | 0`, the Toast will never dismiss automatically.',
    },
  },
  args: {
    /// @ts-expect-error
    darkMode: false,
    initialValue: undefined,
  },
});
export const Basic: ComponentStory<typeof InternalToast> = (
  props: Partial<InternalToastProps> & DarkModeProps,
) => {
  const { pushToast, clearStack } = useToast();

  const createRandomToast = () => {
    const variant = props.variant || sample(Variant);

    pushToast({
      title: `I'm a ${variant} toast`,
      description: faker.lorem.lines(random(1, 2)),
      variant,
      ...props,
    });
  };

  return (
    <div>
      <div
        className={css`
          display: flex;
          gap: 8px;
        `}
      >
        <Button data-testid="toast-trigger" onClick={createRandomToast}>
          Push toast
        </Button>
        <Button onClick={() => clearStack()}>Clear all</Button>
      </div>
    </div>
  );
};

export const Variants: ComponentStory<typeof InternalToast> = (
  props: Partial<InternalToastProps>,
) => {
  const { pushToast, clearStack, getStack, updateToast } = useToast();

  const stack = getStack();
  const progressToasts =
    stack && Array.from(stack).filter(([_, t]) => t.variant === 'progress');

  const [progress, setProgress] = useState(0.1);

  useEffect(() => {
    if (!progressToasts || progressToasts.length === 0) {
      setProgress(0.1);
    }
  }, [progressToasts]);

  return (
    <div>
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin: 1em 0;
        `}
      >
        {Object.values(Variant).map(variant => {
          const VariantIcon = variantIcons[variant];

          return (
            <Button
              key={variant}
              onClick={() => {
                pushToast({
                  title: `I'm a ${variant} toast`,
                  description: faker.lorem.lines(random(1, 2)),
                  variant,
                  progress,
                  ...props,
                });
              }}
            >
              <VariantIcon /> {startCase(variant)} toast
            </Button>
          );
        })}
        <Button onClick={() => clearStack()}>Clear all</Button>
      </div>
      {progressToasts && progressToasts.length > 0 && (
        <>
          <Label htmlFor="progress">Progress: </Label>
          <InlineCode>{progress}</InlineCode>
          <br />
          <input
            value={progress}
            onChange={e => {
              const _progress = Number(e.target.value);
              setProgress(_progress);

              progressToasts.forEach(([id]) => {
                updateToast(id, {
                  progress: _progress,
                });
              });
            }}
            type="range"
            id="progress"
            min={0}
            max={1}
            step={0.1}
          />
        </>
      )}
    </div>
  );
};

export const WithInitialToasts: ComponentStory<typeof InternalToast> = (
  props: Partial<InternalToastProps>,
) => {
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
          const variant = props.variant || sample(Variant);
          pushToast({
            title: `I'm a ${variant} toast`,
            description: faker.lorem.lines(random(1, 2)),
            variant,
            ...props,
          });
        }}
      >
        Push toast
      </Button>
      <Button onClick={() => clearStack()}>Clear all</Button>
    </div>
  );
};

WithInitialToasts.args = {
  // @ts-expect-error
  initialValue: makeToastStack(
    range(6).map(_ =>
      makeToast({
        title: 'Initial toast',
        description: faker.lorem.lines(2),
        variant: sample(Variant),
      }),
    ),
  ),
};
