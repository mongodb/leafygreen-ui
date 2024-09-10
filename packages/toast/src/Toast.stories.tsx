/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryContext, StoryFn } from '@storybook/react';
import range from 'lodash/range';
import startCase from 'lodash/startCase';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { InlineCode, Label, Link } from '@leafygreen-ui/typography';

import { variantIcons } from './InternalToast/VariantIcon';
import { makeToast, makeToastStack } from './ToastContext/utils/makeToast';
import { InternalToast, type InternalToastProps } from './InternalToast';
import { ToastProvider, type ToastProviderProps, useToast, Variant } from '.';

const meta: StoryMetaType<typeof InternalToast, ToastProviderProps> = {
  title: 'Components/Toast',
  component: InternalToast,
  decorators: [
    (Story, meta: StoryContext<InternalToastProps & ToastProviderProps>) => (
      <ToastProvider
        initialValue={meta.args.initialValue}
        portalClassName={css`
          // Ensures a new stacking context is established
          z-index: 1;
        `}
      >
        <Story {...meta} />
      </ToastProvider>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'as',
        'title',
        'description',
        'dismissible',
        'progress',
        'variant',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        description: [
          undefined,
          'Lorem ipsum dolor sit amet',
          <span>
            This is a <Link>Link</Link>
          </span>,
        ],
        dismissible: [true, false],
        variant: Object.values(Variant),
        progress: [0, 1],
        actionElement: [undefined, <Button size="small">Action</Button>],
      },
      args: {
        title: 'This is a toast',
        className: css`
          position: relative;
        `,
      },
      excludeCombinations: [
        {
          progress: 1,
          variant: [
            Variant.Success,
            Variant.Note,
            Variant.Warning,
            Variant.Important,
          ],
        },
        {
          actionElement: <Button />,
          variant: [
            Variant.Success,
            Variant.Note,
            Variant.Warning,
            Variant.Important,
          ],
        },
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
    darkMode: false,
  },
};
export default meta;

const SEED = 0;
faker.seed(SEED);

export const LiveExample: StoryFn<InternalToastProps> = (
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
          const randomText = faker.lorem.lines(1);

          return (
            <Button
              data-testid={`trigger-${variant}`}
              key={variant}
              onClick={() => {
                pushToast({
                  ...props,
                  title: `I'm a ${variant} toast`,
                  description: (
                    <>
                      {randomText}
                      {randomText && (
                        <>
                          &nbsp;
                          <a href="http://localhost:9001">Anchor tag</a>
                          <Link href="http://localhost:9001">
                            Link component
                          </Link>
                        </>
                      )}
                    </>
                  ),
                  variant,
                  progress,
                  timeout: null,
                });
              }}
              leftGlyph={<VariantIcon />}
            >
              {startCase(variant)} toast
            </Button>
          );
        })}
        <Button onClick={() => clearStack()} variant="dangerOutline">
          Clear all
        </Button>
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
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithInitialToasts: StoryFn<
  InternalToastProps & ToastProviderProps
> = (props: Partial<InternalToastProps>) => {
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
          const variant = props.variant || faker.helpers.objectValue(Variant);
          pushToast({
            title: `I'm a ${variant} toast`,
            description: faker.lorem.lines(
              faker.number.int({ min: 1, max: 2 }),
            ),
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
WithInitialToasts.parameters = {
  chromatic: { disableSnapshot: true },
};
WithInitialToasts.args = {
  initialValue: makeToastStack(
    range(6).map(_ =>
      makeToast({
        title: 'Initial toast',
        description: faker.lorem.lines(2),
        variant: faker.helpers.objectValue(Variant),
      }),
    ),
  ),
};

export const Basic: StoryType<typeof InternalToast> = (
  props: Partial<InternalToastProps> & DarkModeProps,
) => {
  const { pushToast, clearStack } = useToast();

  const createRandomToast = () => {
    const variant = props.variant || faker.helpers.objectValue(Variant);

    pushToast({
      title: `I'm a ${variant} toast`,
      description: faker.lorem.lines(faker.number.int({ min: 1, max: 2 })),
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
Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
