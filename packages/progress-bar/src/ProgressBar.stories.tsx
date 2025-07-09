import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import {
  AnimatedLoaderVariant,
  FormatValueType,
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

const TYPES = Object.values(Type);
const SIZES = Object.values(Size);
const FORMAT_VALUE_TYPES = Object.values(FormatValueType);
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
  argTypes: {
    type: {
      control: { type: 'select' },
      options: TYPES,
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
    },
    label: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    formatValue: {
      control: { type: 'select' },
      options: [...FORMAT_VALUE_TYPES, undefined],
    },
    isIndeterminate: {
      if: { arg: 'type', eq: Type.Loader },
      control: { type: 'boolean' },
    },
    maxValue: {
      if: { arg: 'isIndeterminate', neq: true }, // TODO: FIX THIS FOR METERS
      control: { type: 'number' },
    },
    variant: {
      if: { arg: 'type', eq: Type.Loader },
      control: { type: 'select' },
      options: [...LOADER_VARIANTS, undefined],
    },
    status: {
      if: { arg: 'type', eq: Type.Meter },
      control: { type: 'select' },
      options: [...METER_STATUSES, undefined],
    },
    enableAnimation: {
      if: {
        and: [
          { arg: 'isIndeterminate', eq: false },
          { arg: 'type', eq: Type.Loader }, // TODO: FIX THIS FOR METERS
        ],
      },
      control: { type: 'boolean' },
    },
  },
};
export default meta;

export const LiveExample: StoryObj<typeof ProgressBar> = {
  args: {
    ...defaultArgs,
    formatValue: 'fraction',
    showIcon: true,
    label: 'Label',
    description: 'Helper text',
    isIndeterminate: false,
  },
};

export const WithLabel: StoryObj<typeof ProgressBar> = {
  args: {
    ...defaultArgs,
    label: 'Label',
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
    description: 'Helper text',
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
