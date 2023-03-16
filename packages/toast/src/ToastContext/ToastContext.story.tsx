import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { random, sample, startCase } from 'lodash';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps, StoryMeta } from '@leafygreen-ui/lib';
import { Body, InlineCode, Label, Link } from '@leafygreen-ui/typography';

import { InternalToast, InternalToastProps } from '../InternalToast';
import { variantIcons } from '../InternalToast/VariantIcon';
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
      defaultValue: 6_000,
      description:
        'Dismiss the Toast after `timeout` milliseconds. If timeout is `null | 0`, the Toast will never dismiss automatically.',
    },
  },
  args: {
    /// @ts-expect-error
    darkMode: false,
  },
});

const BasicChildren = (props: Partial<InternalToastProps>) => {
  const { pushToast, clearStack } = useToast();

  return (
    <div>
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
              ...props,
            });
          }}
        >
          Push toast
        </Button>
        <Button onClick={() => clearStack()}>Clear all</Button>
      </div>
      {/* TODO: Remove this */}
      <Body>
        Please provide any feedback in{' '}
        <Link href="https://docs.google.com/document/d/1xgzfJhkWugpEeBlbomTpkrlbjedNxdwn7A0vg3jvDXo/edit#">
          this doc
        </Link>
      </Body>
    </div>
  );
};

export const Basic = ({
  darkMode,
  ...props
}: Partial<InternalToastProps> & DarkModeProps) => {
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ToastProvider>
        <BasicChildren {...props} />
      </ToastProvider>
    </LeafyGreenProvider>
  );
};

const VariantsChildren = (props: Partial<InternalToastProps>) => {
  const { pushToast, clearStack, getStack, updateToast } = useToast();

  const stack = getStack();
  const progressToasts =
    stack && Array.from(stack).filter(([_, t]) => t.variant === 'progress');

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!progressToasts || progressToasts.length === 0) {
      setProgress(0);
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
                  progress: 0,
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
                updateToast({
                  id,
                  props: {
                    progress: _progress,
                  },
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
      {/* TODO: Remove this */}
      <Body>
        Please provide any feedback in{' '}
        <Link href="https://docs.google.com/document/d/1xgzfJhkWugpEeBlbomTpkrlbjedNxdwn7A0vg3jvDXo/edit#">
          this doc
        </Link>
      </Body>
    </div>
  );
};

export const Variants = ({
  darkMode,
  ...props
}: Partial<InternalToastProps> & DarkModeProps) => {
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ToastProvider>
        <VariantsChildren {...props} />
      </ToastProvider>
    </LeafyGreenProvider>
  );
};
