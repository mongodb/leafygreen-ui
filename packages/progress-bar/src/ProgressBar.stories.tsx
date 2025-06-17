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
      combineArgs: {
        value: [40],
        showIcon: [true],
        darkMode: [false, true],
        variant: ['info', 'success', 'warning', 'error'],
        size: ['default', 'small', 'large'],
        type: ['determinate', 'indeterminate'],
        disabled: [false, true],
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
  type: 'determinate',
  value: 48,
  maxValue: 200,
  valueDisplayFormat: 'fraction',
  valueUnits: 'units',
  showValue: true,
  showIcon: true,
  label: <span>Label</span>,
  description: <span>Helper text</span>,
};

export const Basic = Template.bind({});
Basic.args = {
  type: 'determinate',
  value: 27,
  maxValue: 200,
};

export const WithLabel = Basic.bind({});
WithLabel.args = {
  ...Basic.args,
  label: <span>Label</span>,
};

export const WithValueDisplay = Template.bind({});
WithValueDisplay.args = {
  ...Basic.args,
  valueDisplayFormat: 'percentage',
  valueUnits: 'units',
  showValue: true,
};

export const WithValueIcon = Template.bind({});
WithValueIcon.args = {
  ...WithValueDisplay.args,
  showIcon: true,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...Basic.args,
  description: <span>Helper text</span>,
};

export const Generated = () => {};
