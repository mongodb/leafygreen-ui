import React, { useEffect, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { ProgressBar, ProgressBarProps } from '.';

const meta: StoryMetaType<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['DeterminateVariants', 'IndeterminateVariants'],
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
      setValue(200);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [props.value]);

  return <ProgressBar {...props} value={value} />;
};

export const LiveExample: StoryObj<typeof ProgressBar> = {
  args: {
    value: 90,
    maxValue: 200,
    formatValue: 'fraction',
    showIcon: true,
    label: <span>Label</span>,
    description: <span>Helper text</span>,
  },
  render: SimulatedProgressBar,
};

export const BasicDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    value: 80,
    maxValue: 200,
  },
  render: SimulatedProgressBar,
};

export const Indeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    isIndeterminate: true,
  },
};

export const WithLabel: StoryObj<typeof ProgressBar> = {
  args: {
    ...BasicDeterminate.args,
    label: <span>Label</span>,
  },
};

export const WithValueDisplay: StoryObj<typeof ProgressBar> = {
  args: {
    ...BasicDeterminate.args,
    formatValue: 'percentage',
  },
};

export const WithDescription: StoryObj<typeof ProgressBar> = {
  args: {
    ...BasicDeterminate.args,
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
        isIndeterminate: false,
        value: 47,
        maxValue: 200,
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
        isIndeterminate: true,
        value: 12,
        formatValue: (value: number) => `${value} MBs`,
        showIcon: true,
      },
    },
  },
};
