import React, { useEffect, useState } from 'react';
import { StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import { ProgressBar, ProgressBarProps, Type } from '.';

const testValues = {
  value: 53,
  maxValue: 200,
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

export default {
  title: 'Components/ProgressBar/Interactions',
  component: ProgressBar,
  parameters: {
    default: 'LiveExample',
  },
};

export const WithChangingValue: StoryObj<typeof ProgressBar> = {
  args: {
    type: Type.Loader,
    value: testValues.value,
    maxValue: testValues.maxValue,
    formatValue: 'percentage',
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
      // transition timeout with buffer time of 500ms
      { timeout: 2000 },
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
      // transition timeout with buffer time of 500ms
      { timeout: 4000 },
    );

    expect(finalText).toBeInTheDocument();
  },
};

export const IndeterminateToDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    type: Type.Loader,
    isIndeterminate: true,
  },
  render: initialArgs => (
    <DynamicProgressBar
      transitions={[
        [
          3500,
          {
            type: Type.Loader,
            isIndeterminate: false,
            value: testValues.maxValue,
            maxValue: testValues.maxValue,
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
      // transition timeout with buffer time of 500ms
      { timeout: 4000 },
    );
  },
};
