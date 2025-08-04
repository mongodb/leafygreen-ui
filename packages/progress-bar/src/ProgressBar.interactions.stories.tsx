import React, { useEffect, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import {
  requiredA11yArgs,
  STORY_TIMEOUT_BUFFER,
  storyValues,
} from './test.constants';
import { ProgressBar, ProgressBarProps } from '.';

const interactionWaitTimes = {
  micro: 50,
  short: 1500,
  medium: 3500,
};

const DynamicProgressBar = ({
  transitions,
  ...initialProps
}: ProgressBarProps & {
  transitions?: Array<[number, ProgressBarProps]>;
}) => {
  const [currentProps, setCurrentProps] =
    useState<ProgressBarProps>(initialProps);

  useEffect(() => {
    const timers = transitions?.map(([delay, newProps]) =>
      setTimeout(() => {
        setCurrentProps(newProps);
      }, delay),
    );

    return () => timers?.forEach(clearTimeout);
  }, [transitions]);

  return <ProgressBar {...currentProps} />;
};

const meta: StoryMetaType<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Interactions',
  component: ProgressBar,
  parameters: {
    default: null,
  },
};
export default meta;

export const WithSuddenChangingValue: StoryObj<typeof ProgressBar> = {
  args: {
    ...requiredA11yArgs,
    value: storyValues.value,
    maxValue: storyValues.maxValue,
    formatValue: 'fraction',
  },
  render: initialArgs => (
    <DynamicProgressBar
      transitions={[
        [
          interactionWaitTimes.short,
          { ...initialArgs, value: storyValues.maxValue },
        ],
      ]}
      {...initialArgs}
    />
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      storyValues.value.toString(),
    );

    await waitFor(
      () => {
        expect(progressBar.getAttribute('aria-valuenow')).toBe(
          storyValues.maxValue.toString(),
        );
      },
      { timeout: interactionWaitTimes.short + STORY_TIMEOUT_BUFFER },
    );
  },
};

export const WithIncrementalChangingValue: StoryObj<typeof ProgressBar> = {
  args: {
    ...requiredA11yArgs,
    value: storyValues.value,
    maxValue: storyValues.maxValue,
    formatValue: 'fraction',
  },
  render: initialArgs => {
    const { value: startValue, maxValue: endValue } = storyValues;

    // create transitions array containing each individual step
    const transitions = Array.from(
      { length: endValue - startValue },
      (_, i) =>
        [
          (i + 1) * interactionWaitTimes.micro,
          { ...initialArgs, value: startValue + i + 1 },
        ] as [number, ProgressBarProps],
    );

    return <DynamicProgressBar transitions={transitions} {...initialArgs} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      storyValues.value.toString(),
    );

    await waitFor(
      () => {
        expect(progressBar.getAttribute('aria-valuenow')).toBe(
          storyValues.maxValue.toString(),
        );
      },
      {
        timeout:
          (storyValues.maxValue - storyValues.value) *
            interactionWaitTimes.micro +
          STORY_TIMEOUT_BUFFER,
      },
    );
  },
};

export const WithChangingDescriptions: StoryObj<typeof ProgressBar> = {
  args: {
    ...WithSuddenChangingValue.args,
    description: <span>Helper text</span>,
  },
  render: initialArgs => (
    <DynamicProgressBar
      transitions={[
        [
          interactionWaitTimes.short,
          { ...initialArgs, description: <span>New helper text...</span> },
        ],
        [
          interactionWaitTimes.medium,
          {
            ...initialArgs,
            description: <span>Even newer helper text...!</span>,
          },
        ],
      ]}
      {...initialArgs}
    />
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const finalText = await waitFor(
      () => canvas.getByText('Even newer helper text...!'),
      { timeout: interactionWaitTimes.medium + STORY_TIMEOUT_BUFFER },
    );

    expect(finalText).toBeInTheDocument();
  },
};

export const IndeterminateToDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    ...requiredA11yArgs,
    isIndeterminate: true,
  },
  render: initialArgs => (
    <DynamicProgressBar
      transitions={[
        [
          interactionWaitTimes.medium,
          {
            ...initialArgs,
            isIndeterminate: false,
            value: storyValues.maxValue,
            maxValue: storyValues.maxValue,
          },
        ],
      ]}
      {...initialArgs}
    />
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    expect(progressBar).not.toHaveAttribute('aria-valuenow');

    await waitFor(
      () => {
        expect(progressBar.getAttribute('aria-valuenow')).toBe(
          storyValues.maxValue.toString(),
        );
      },
      { timeout: interactionWaitTimes.medium + STORY_TIMEOUT_BUFFER },
    );
  },
};
