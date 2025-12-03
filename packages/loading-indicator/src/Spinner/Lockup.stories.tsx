import React from 'react';
import { InstanceDecorator, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Size } from '@leafygreen-ui/tokens';

import { SpinnerLockup } from './Lockup';
import { SpinnerLockupProps } from './Lockup.types';
import { SpinnerProps } from '.';

type SpinnerStoryProps = SpinnerLockupProps & SpinnerProps & { text: string };

export default {
  title: 'Composition/Loading/LoadingIndicator/SpinnerLockup',
  component: SpinnerLockup,
  parameters: {
    default: 'LiveExample',
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    colorOverride: {
      control: 'color',
    },
    text: {
      control: 'text',
    },
  },
  args: {
    size: Size.Default,
    direction: 'vertical',
    text: 'Loading...',
  },
} satisfies StoryMetaType<typeof SpinnerLockup>;

export const LiveExample: StoryObj<SpinnerStoryProps> = {
  render: args => {
    const { size, colorOverride, disableAnimation, text } = args;

    return (
      <SpinnerLockup>
        <SpinnerLockup.Spinner
          size={size}
          colorOverride={colorOverride}
          disableAnimation={disableAnimation}
        />
        <SpinnerLockup.Description>{text}</SpinnerLockup.Description>
      </SpinnerLockup>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const instanceDecorator: InstanceDecorator = (StoryFn, ctx) => {
  const size = ctx?.args?.size;
  return (
    <StoryFn>
      <SpinnerLockup.Spinner size={size} disableAnimation />
      <SpinnerLockup.Description>Loading...</SpinnerLockup.Description>
    </StoryFn>
  );
};

export const Generated: StoryObj<typeof SpinnerLockup> = {
  render: () => <></>,
  parameters: {
    generate: {
      decorator: instanceDecorator,
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        direction: ['vertical', 'horizontal'],
      },
    },
  },
};
