import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import {
  AnimatedVariant,
  FormatValueType,
  ProgressBar,
  ProgressBarProps,
  Role,
  Size,
  Variant,
} from '.';

const testValues = {
  value: 103,
  maxValue: 200,
};

const defaultArgs: ProgressBarProps = {
  value: testValues.value,
  maxValue: testValues.maxValue,
  'aria-label': 'required label',
};

const ROLES = Object.values(Role);
const SIZES = Object.values(Size);
const FORMAT_VALUE_TYPES = Object.values(FormatValueType);
const VARIANTS = Object.values(Variant);
const ANIMATED_VARIANTS = Object.values(AnimatedVariant);

const meta: StoryMetaType<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: [
        'IndeterminateVariants',
        'DeterminateProgressVariants',
        'DeterminateMeterVariants',
      ],
      args: {
        label: <span key="label">Label</span>,
        description: <span key="description">Helper text</span>,
        'aria-label': 'required label',
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
    isIndeterminate: {
      control: { type: 'boolean' },
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
      options: [...FORMAT_VALUE_TYPES, 'custom example', undefined],
      mapping: {
        'custom example': (value: number) => `Currently at ${value} GB`,
      },
    },
    variant: {
      control: { type: 'select' },
      options: [...VARIANTS, undefined],
    },
    maxValue: {
      control: { type: 'number' },
      if: { arg: 'isIndeterminate', neq: true },
    },
    roleType: {
      control: { type: 'select' },
      options: ROLES,
      if: { arg: 'isIndeterminate', neq: true },
    },
    enableAnimation: {
      description:
        '**Only available** if roleType="progressbar" and isIndeterminate=true.',
      control: { type: 'boolean' },
      // if: { arg: 'roleType', eq: Role.Progress } AND { arg: 'isIndeterminate', neq: true }, // TODO: not supported
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

export const WithHeaderTruncation: StoryObj<typeof ProgressBar> = {
  args: {
    ...WithValueDisplay.args,
    label: (
      <span>
        Label with a very long label that will be truncated, probably. Honestly
        if you shrink your screen small enough I am expecting so. Never mind,
        somehow it is still short enough. But if I add just another sentence
        perhaps, the rest of this will be truncated.
      </span>
    ),
  },
};

export const IndeterminateVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        variant: ANIMATED_VARIANTS,
      },
      args: {
        isIndeterminate: true,
        value: testValues.value,
        formatValue: (value: number) => `${value} MBs`,
        showIcon: true,
      },
    },
  },
};

export const DeterminateProgressVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        variant: VARIANTS,
        enableAnimation: [false, true],
        disabled: [false, true],
      },
      args: {
        ...defaultArgs,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          variant: VARIANTS.filter(
            v => !(ANIMATED_VARIANTS as Array<Variant>).includes(v),
          ),
          enableAnimation: [true],
        },
        {
          variant: VARIANTS.filter(v => v !== Variant.Info),
          disabled: [true],
        },
      ],
    },
  },
};

export const DeterminateMeterVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        variant: [undefined, ...VARIANTS],
        disabled: [false, true],
      },
      args: {
        ...defaultArgs,
        roleType: Role.Meter,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          variant: VARIANTS,
          disabled: [true],
        },
      ],
    },
  },
};
