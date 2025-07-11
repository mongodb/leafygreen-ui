import React, { useEffect, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import { ProgressBar, ProgressBarProps } from '.';

const testValues = {
  value: 53,
  maxValue: 200,
  timeoutBuffer: 500,
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

export const WithChangingValue: StoryObj<typeof ProgressBar> = {
  args: {
    value: testValues.value,
    maxValue: testValues.maxValue,
    formatValue: 'fraction',
  },
  render: initialArgs => (
    <DynamicProgressBar
      transitions={[[1500, { ...initialArgs, value: testValues.maxValue }]]}
      {...initialArgs}
    />
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      testValues.value.toString(),
    );

    await waitFor(
      () => {
        expect(progressBar.getAttribute('aria-valuenow')).toBe(
          testValues.maxValue.toString(),
        );
      },
      { timeout: 1500 + testValues.timeoutBuffer },
    );
  },
};

export const WithChangingDescriptions: StoryObj<typeof ProgressBar> = {
  args: {
    ...WithChangingValue.args,
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
      { timeout: 3500 + testValues.timeoutBuffer },
    );

    expect(finalText).toBeInTheDocument();
  },
};

export const IndeterminateToDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    isIndeterminate: true,
  },
  render: initialArgs => (
    <DynamicProgressBar
      transitions={[
        [
          3500,
          {
            isIndeterminate: false,
            value: testValues.maxValue,
            maxValue: testValues.maxValue,
            'aria-label': 'required label',
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
          testValues.maxValue.toString(),
        );
      },
      { timeout: 3500 + testValues.timeoutBuffer },
    );
  },
};
