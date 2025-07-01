import React, { useEffect, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';

import {
  AnimatedLoaderVariant,
  LoaderVariant,
  MeterStatus,
  ProgressBar,
  ProgressBarProps,
  Size,
  Type,
} from '.';

const testValues = {
  value: 53,
  maxValue: 200,
};

const SIZES = Object.values(Size);
const LOADER_VARIANTS = Object.values(LoaderVariant);
const ANIMATED_LOADER_VARIANTS = Object.values(AnimatedLoaderVariant);
const METER_STATUSES = Object.values(MeterStatus);

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
        size: SIZES,
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
    type: Type.Loader,
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
    type: Type.Loader,
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
    type: Type.Meter,
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
        variant: LOADER_VARIANTS,
        enableAnimation: [false, true],
        disabled: [false, true],
      },
      args: {
        type: Type.Loader,
        isIndeterminate: false,
        value: testValues.value,
        maxValue: testValues.maxValue,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          variant: LOADER_VARIANTS.filter(
            v =>
              !(ANIMATED_LOADER_VARIANTS as Array<LoaderVariant>).includes(v),
          ),
          enableAnimation: [true],
        },
        {
          variant: LOADER_VARIANTS.filter(v => v !== LoaderVariant.Info),
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
        variant: ANIMATED_LOADER_VARIANTS,
      },
      args: {
        type: Type.Loader,
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
        status: [undefined, ...METER_STATUSES],
        disabled: [false, true],
      },
      args: {
        type: Type.Meter,
        value: testValues.value,
        maxValue: testValues.maxValue,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          status: METER_STATUSES,
          disabled: [true],
        },
      ],
    },
  },
};
