/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryContext, StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  LeafyGreenProviderProps,
} from '@leafygreen-ui/leafygreen-provider';
import { Link } from '@leafygreen-ui/typography';

import { Variant } from '../Toast.types';

import { InternalToast, InternalToastProps } from '.';

const meta: StoryMetaType<typeof InternalToast> = {
  title: 'Components/Toast/Internal',
  component: InternalToast,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams, 'open'],
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
  decorators: [
    (
      Story,
      meta: StoryContext<LeafyGreenProviderProps & InternalToastProps>,
    ) => (
      <LeafyGreenProvider darkMode={!!meta.args.darkMode}>
        <Story />
      </LeafyGreenProvider>
    ),
  ],
  args: {
    title: 'This is a toast',
    description: 'Exercitation incididunt ea proident velit mollit',
    variant: Variant.Note,
    progress: 0,
    className: css`
      z-index: 1;
    `,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(Variant),
      default: Variant.Note,
    },
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      if: { arg: 'variant', eq: Variant.Progress },
    },
    description: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
  },
};
export default meta;
export const Basic: StoryFn<InternalToastProps> = args => (
  <InternalToast {...args} />
);
Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithLink = Basic.bind({});
WithLink.args = {
  description: (
    <>
      Exercitation incididunt ea proident. &nbsp;
      <Link href="http://localhost:9001">Link style</Link>
    </>
  ),
};
WithLink.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithAction = Basic.bind({});
WithAction.args = {
  variant: Variant.Progress,
  actionElement: <Button size="small">Action</Button>,
  title: 'Velit ea exercitation qui aute.',
  description: (
    <>
      Exercitation incididunt &nbsp;
      <Link href="http://localhost:9001">Link style</Link>
    </>
  ),
};
WithAction.parameters = {
  chromatic: { disableSnapshot: true },
};
