import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { isAnimatedVariant } from './ProgressBar/utils';
import { requiredA11yArgs, storyValues } from './test.constants';
import {
  AnimatedVariant,
  FormatValueType,
  ProgressBar,
  ProgressBarProps,
  Role,
  Size,
  Variant,
} from '.';

const sharedDeterminateArgs: ProgressBarProps = {
  ...requiredA11yArgs,
  value: storyValues.value,
  maxValue: storyValues.maxValue,
};

const disabledDarkModeArgTypes = {
  argTypes: {
    darkMode: {
      table: { disable: true },
    },
  },
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
    // pause animations at the first frame for chromatic snapshots to accommodate infinite looping animations
    chromatic: { pauseAnimationAtEnd: false },
    generate: {
      storyNames: [
        'IndeterminateVariants',
        'DeterminateProgressVariants',
        'DeterminateMeterVariants',
      ],
      args: {
        ...requiredA11yArgs,
        label: <span key="label">Label</span>,
        description: <span key="description">Helper text</span>,
      },
      combineArgs: {
        size: SIZES,
        darkMode: [false, true],
      },
      decorator: (InstanceFn, context) => (
        <div style={{ padding: '48px' }}>
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <InstanceFn />
          </LeafyGreenProvider>
        </div>
      ),
    },
  },
  decorators: [
    (InstanceFn, context) => (
      <LeafyGreenProvider darkMode={context?.args.darkMode}>
        <InstanceFn />
      </LeafyGreenProvider>
    ),
  ],
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
      options: VARIANTS,
      // storybook fails to parse ts docs description for this prop
      description:
        'Determinate variants: `info`, `success`, `warning`, `error`. Indeterminate variants: `info`, `success`.',
    },
    maxValue: {
      control: { type: 'number' },
      if: { arg: 'isIndeterminate', neq: true },
    },
    role: {
      control: { type: 'select' },
      options: ROLES,
      if: { arg: 'isIndeterminate', neq: true },
    },
    enableAnimation: {
      description:
        '**Only available** if role="progressbar" and isIndeterminate=false. **Only available** for `info` and `success` variants.',
      control: { type: 'boolean' },
      // if: { arg: 'role', eq: Role.Progress } AND { arg: 'isIndeterminate', neq: true }, // TODO: not supported
    },
  },
};
export default meta;

export const LiveExample: StoryObj<typeof ProgressBar> = {
  args: {
    ...sharedDeterminateArgs,
    formatValue: 'fraction',
    showIcon: true,
    label: 'Label',
    description: 'Helper text',
  },
};

export const WithLabel: StoryObj<typeof ProgressBar> = {
  args: {
    ...sharedDeterminateArgs,
    label: 'Label',
  },
};

export const WithValueDisplay: StoryObj<typeof ProgressBar> = {
  args: {
    ...sharedDeterminateArgs,
    formatValue: 'percentage',
  },
};

export const WithDescription: StoryObj<typeof ProgressBar> = {
  args: {
    ...sharedDeterminateArgs,
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
        ...requiredA11yArgs,
        isIndeterminate: true,
        value: storyValues.value,
        formatValue: (value: number) => `${value} MBs`,
        showIcon: true,
      },
    },
  },
  ...disabledDarkModeArgTypes,
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
        ...sharedDeterminateArgs,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          variant: VARIANTS.filter(v => !isAnimatedVariant(v)),
          enableAnimation: [true],
        },
        {
          // to reduce redundancy, we only generate disabled styles for one variant
          variant: VARIANTS.filter(v => v !== Variant.Info),
          disabled: [true],
        },
      ],
    },
  },
  ...disabledDarkModeArgTypes,
};

export const DeterminateMeterVariants: StoryObj<typeof ProgressBar> = {
  parameters: {
    generate: {
      combineArgs: {
        variant: VARIANTS,
        disabled: [false, true],
      },
      args: {
        ...sharedDeterminateArgs,
        role: Role.Meter,
        formatValue: (value: number, maxValue?: number) =>
          `${value} / ${maxValue} GB`,
        showIcon: true,
      },
      excludeCombinations: [
        {
          // to reduce redundancy, we only generate disabled styles for one variant
          variant: VARIANTS.filter(v => v !== Variant.Info),
          disabled: [true],
        },
      ],
    },
  },
  ...disabledDarkModeArgTypes,
};
