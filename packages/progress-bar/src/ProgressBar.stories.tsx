import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ProgressBar } from '.';

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
        variant: ['info', 'success', 'warning', 'error'],
        size: ['small', 'default', 'large'],
        disabled: [false, true],
        darkMode: [false, true],
      },
      // to minimize redundancy in disabled states
      excludeCombinations: [
        {
          variant: ['success', 'warning', 'error'],
          disabled: [true],
        },
      ],
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

export const BasicDeterminate = Template.bind({});
BasicDeterminate.args = {
  value: 27,
  maxValue: 200,
};

export const BasicIndeterminate = Template.bind({});
BasicIndeterminate.args = {
  isIndeterminate: true,
};

export const WithLabel = BasicDeterminate.bind({});
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
    args: {
      isIndeterminate: false,
      value: 47,
      maxValue: 200,
      formatValue: (value: number, maxValue?: number) =>
        `${value} / ${maxValue} GB`,
      showIcon: true,
    },
  },
};

export const IndeterminateVariants = Template.bind({});
IndeterminateVariants.parameters = {
  generate: {
    args: {
      isIndeterminate: true,
      value: 12,
      formatValue: (value: number) => `${value} MBs`,
      showIcon: true,
    },
  },
};
