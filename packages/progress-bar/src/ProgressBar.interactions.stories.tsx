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
  render: initialArgs => {
    return (
      <DynamicProgressBar
        transitions={[[1500, { ...initialArgs, value: storyValues.maxValue }]]}
        {...initialArgs}
      />
    );
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
        timeout: 1500 + STORY_TIMEOUT_BUFFER,
      },
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
    const startValue = storyValues.value;
    const endValue = storyValues.maxValue;

    const stepDuration = 25;
    const transitions: Array<[number, ProgressBarProps]> = [];

    for (let i = 1; i <= endValue - startValue; i++) {
      transitions.push([
        i * stepDuration,
        { ...initialArgs, value: startValue + i },
      ]);
    }

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
          (storyValues.maxValue - storyValues.value) * 25 +
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
          1500,
          { ...initialArgs, description: <span>New helper text...</span> },
        ],
        [
          3500,
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
      { timeout: 3500 + STORY_TIMEOUT_BUFFER },
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
          3500,
          {
            ...requiredA11yArgs,
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
      { timeout: 3500 + STORY_TIMEOUT_BUFFER },
    );
  },
};
