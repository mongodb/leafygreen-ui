import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

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
  value: 103,
  maxValue: 200,
};

const defaultArgs: ProgressBarProps = {
  type: Type.Loader,
  value: testValues.value,
  maxValue: testValues.maxValue,
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

export const LiveExample: StoryObj<typeof ProgressBar> = {
  args: {
    ...defaultArgs,
    formatValue: 'fraction',
    showIcon: true,
    label: <span>Label</span>,
    description: <span>Helper text</span>,
  },
};

export const WithLabel: StoryObj<typeof ProgressBar> = {
  args: {
    ...defaultArgs,
    label: <span>Label</span>,
  },
};

export const WithValueDisplay: StoryObj<typeof ProgressBar> = {
  args: {
    ...defaultArgs,
    formatValue: 'percentage',
  },
};

export const WithDescription: StoryObj<typeof ProgressBar> = {
  args: {
    ...defaultArgs,
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
        ...defaultArgs,
        isIndeterminate: false,
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
