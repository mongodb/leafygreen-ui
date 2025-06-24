import React, { useEffect, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { Variant } from '@leafygreen-ui/tokens';

import { ProgressBar, ProgressBarProps } from '.';

const unsupportedAnimationCombinations = {
  variant: [Variant.Warning, Variant.Error],
  enableAnimation: [true],
};

const redundantDisabledCombinations = {
  variant: [Variant.Warning, Variant.Error, Variant.Success],
  disabled: [true],
};

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
        disabled: [false, true],
        darkMode: [false, true],
      },
      excludeCombinations: [redundantDisabledCombinations],
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

const Template: StoryFn<typeof ProgressBar> = props => (
  <ProgressBar {...props} />
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  value: 90,
  maxValue: 200,
  formatValue: 'fraction',
  showIcon: true,
  label: <span>Label</span>,
  description: <span>Helper text</span>,
};

export const BasicDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    value: 10,
    maxValue: 200,
  },
  render: (props: ProgressBarProps) => {
    const [value, setValue] = useState(props.value || 0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setValue(200);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }, [props.value]);

    return <ProgressBar {...props} value={value} />;
  },
};

export const ShimmerDeterminate: StoryObj<typeof ProgressBar> = {
  args: {
    value: 80,
    maxValue: 200,
    enableAnimation: true,
  },
  render: (props: ProgressBarProps) => {
    const [value, setValue] = useState(props.value || 0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setValue(200);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }, [props.value]);

    return <ProgressBar {...props} value={value} />;
  },
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  isIndeterminate: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...BasicDeterminate.args,
  label: <span>Label</span>,
};

export const WithValueDisplay = Template.bind({});
WithValueDisplay.args = {
  ...BasicDeterminate.args,
  formatValue: 'percentage',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...BasicDeterminate.args,
  description: <span>Helper text</span>,
};

export const DeterminateVariants = Template.bind({});
DeterminateVariants.parameters = {
  generate: {
    combineArgs: {
      variant: ['info', 'success', 'warning', 'error'],
      enableAnimation: [false, true],
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
      unsupportedAnimationCombinations,
      redundantDisabledCombinations,
    ],
  },
};

export const IndeterminateVariants = Template.bind({});
IndeterminateVariants.parameters = {
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
};
