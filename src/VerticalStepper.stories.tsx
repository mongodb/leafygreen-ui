import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Link } from '@leafygreen-ui/typography';

import { VerticalStep, VerticalStepper } from '.';

export default {
  title: 'Components/VerticalStepper',
  component: VerticalStepper,
  parameters: {
    default: 'LiveExample',
  },
  args: {
    darkMode: false,
    currentStep: 0,
    children: [
      <VerticalStep
        key={1}
        title="first step"
        description={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            efficitur nunc mattis magna pretium, id mattis metus vestibulum.
            Integer cursus ex ante, ut molestie lorem vestibulum id.{' '}
            <Link href="https://www.mongodb.design/">Im a link</Link>
          </>
        }
        primaryButtonProps={{
          children: 'primary button',
          // eslint-disable-next-line no-console
          onClick: () => console.log('click'),
        }}
      />,
      <VerticalStep
        key={2}
        title="second step"
        description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        primaryButtonProps={{ children: 'primary button' }}
        secondaryButtonProps={{ children: 'secondary button' }}
        media={<img alt="test" src="https://placehold.co/170x85" />}
      />,
      <VerticalStep
        key={3}
        title="third step"
        description="In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis. Nulla malesuada dui non consectetur placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eleifend, ante eget rhoncus dignissim, ex ex interdum arcu, quis commodo erat lectus non felis."
        primaryButtonProps={{ children: 'primary button' }}
        secondaryButtonProps={{ children: 'secondary button' }}
        media={<img alt="test" src="https://placehold.co/170x100" />}
      />,
      <VerticalStep
        key={4}
        title="fourth step"
        description="Morbi et tellus dapibus, ultrices risus at, vestibulum urna. Vivamus lorem ex, iaculis sit amet bibendum eget, tristique in ante."
        primaryButtonProps={{ children: 'primary button' }}
      />,
      <VerticalStep
        key={5}
        title="fifth step"
        description="Sed sed arcu mi. Sed sed arcu mi. Sed sed arcu mi."
        primaryButtonProps={{ children: 'primary button' }}
        media={<img alt="test" src="https://placehold.co/800x620" />}
      />,
      <VerticalStep
        key={6}
        title="sixth step"
        description="Morbi vitae imperdiet elit. Sed pharetra interdum sagittis. Ut venenatis neque id vestibulum varius. In sed dictum augue. Sed sed arcu mi."
      />,
    ],
  },
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
    currentStep: {
      control: {
        type: 'number',
        min: 0,
        max: 6,
      },
    },
  },
} satisfies StoryMetaType<typeof VerticalStepper>;

export const LiveExample = {
  render: ({ ...args }) => <VerticalStepper {...args}></VerticalStepper>,
} satisfies StoryObj<typeof VerticalStepper>;

export const Generated = {
  render: () => <></>,
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        currentStep: [0, 2, 6],
      },
    },
  },
} satisfies StoryObj<typeof VerticalStepper>;
