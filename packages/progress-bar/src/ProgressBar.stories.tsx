import React, { useEffect, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import { ProgressBar, ProgressBarProps } from '.';

const testValues = {
  value: 53,
  maxValue: 200,
};

const meta: StoryMetaType<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: [
        'DeterminateVariants',
        'IndeterminateVariants',
        'MeterVariants',
      ],
      args: {
        label: <span key="label">Label</span>,
        description: <span key="description">Helper text</span>,
      },
      combineArgs: {
        size: ['small', 'default', 'large'],
        darkMode: [false, true],
      },
      decorator: (InstanceFn, context) => {
        return (
          <div style={{ padding: '48px' }}>
            <InstanceFn {...context?.args} />
          </div>
        );
      },
    },
  },
};
export default meta;

const SimulatedProgressBar = (props: ProgressBarProps) => {
  const [value, setValue] = useState(props.value ?? 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(testValues.maxValue);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [props.value]);

  return <ProgressBar {...props} value={value} />;
};

const testSimulatedProgressToCompletion = async ({
  role,
  canvas,
}: {
  role: 'meter' | 'progressbar';
  canvas: ReturnType<typeof within>;
}) => {
  const progressBar = canvas.getByRole(role);

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
    { timeout: 2000 },
  );
};

export const LiveExample: StoryObj<typeof ProgressBar> = {
  args: {
    type: 'loader',
    value: testValues.value,
    maxValue: testValues.maxValue,
    formatValue: 'fraction',
    showIcon: true,
    label: <span>Label</span>,
    description: <span>Helper text</span>,
  },
  render: SimulatedProgressBar,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await testSimulatedProgressToCompletion({
      role: 'progressbar',
      canvas,
    });
  },
};

export const DeterminateLoader: StoryObj<typeof ProgressBar> = {
  args: {
    type: 'loader',
    value: testValues.value,
    maxValue: testValues.maxValue,
  },
  render: SimulatedProgressBar,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await testSimulatedProgressToCompletion({
      role: 'progressbar',
      canvas,
    });
  },
};

export const IndeterminateLoader: StoryObj<typeof ProgressBar> = {
  args: {
    isIndeterminate: true,
  },
};

export const Meter: StoryObj<typeof ProgressBar> = {
  args: {
    type: 'meter',
    value: testValues.value,
    maxValue: testValues.maxValue,
  },
  render: SimulatedProgressBar,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await testSimulatedProgressToCompletion({
      role: 'meter',
      canvas,
    });
  },
};

export const WithLabel: StoryObj<typeof ProgressBar> = {
  args: {
    ...DeterminateLoader.args,
    label: <span>Label</span>,
  },
};

export const WithValueDisplay: StoryObj<typeof ProgressBar> = {
  args: {
    ...DeterminateLoader.args,
    formatValue: 'percentage',
  },
};

export const WithDescription: StoryObj<typeof ProgressBar> = {
  args: {
    ...DeterminateLoader.args,
    description: <span>Helper text</span>,
  },
};

export const DeterminateVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        variant: ['info', 'success', 'warning', 'error'],
        enableAnimation: [false, true],
        disabled: [false, true],
      },
      args: {
        type: 'loader',
        isIndeterminate: false,
        value: testValues.value,
        maxValue: testValues.maxValue,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          variant: ['warning', 'error'],
          enableAnimation: [true],
        },
        {
          variant: ['success', 'warning', 'error'],
          disabled: [true],
        },
      ],
    },
  },
};

export const IndeterminateVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        variant: ['info', 'success'],
      },
      args: {
        type: 'loader',
        isIndeterminate: true,
        value: testValues.value,
        formatValue: (value: number) => `${value} MBs`,
        showIcon: true,
      },
    },
  },
};

export const MeterVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        status: [undefined, 'healthy', 'warning', 'error'],
        disabled: [false, true],
      },
      args: {
        type: 'meter',
        value: testValues.value,
        maxValue: testValues.maxValue,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          status: ['healthy', 'warning', 'error'],
          disabled: [true],
        },
      ],
    },
  },
};

export const IndeterminateToDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    isIndeterminate: true,
  },
  render: function TransitioningProgressBar(props: ProgressBarProps) {
    const [newProps, setNewProps] = useState({});

    useEffect(() => {
      const indeterminateTimer = setTimeout(() => {
        setNewProps({ isIndeterminate: false, value: 1, maxValue: 200 });

        const valueTimer = setTimeout(() => {
          setNewProps({ isIndeterminate: false, value: 100, maxValue: 200 });
        }, 1500);

        return () => clearTimeout(valueTimer);
      }, 3500);

      return () => clearTimeout(indeterminateTimer);
    }, [props.value]);

    return <ProgressBar {...props} {...newProps} />;
  },
};
