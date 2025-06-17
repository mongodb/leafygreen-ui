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
        value: [39],
        darkMode: [false, true],
        variant: ['info', 'success', 'warning', 'error'],
        size: ['default', 'small', 'large'],
        type: ['determinate', 'indeterminate'],
        showIcon: [true],
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
  value: 27,
  maxValue: 200,
  valueDisplayFormat: 'fraction',
  size: 'default',
  variant: 'info',
  label: <span>Label</span>,
  description: <span>Helper text</span>,
  showValue: true,
  showIcon: true,
  valueUnits: 'units',
};

export const Basic = Template.bind({});
Basic.args = {
  type: 'determinate',
  value: 27,
  maxValue: 200,
  valueDisplayFormat: 'fraction',
  size: 'default',
  variant: 'info',
};

export const WithLabel = Basic.bind({});
WithLabel.args = {
  ...Basic.args,
  label: <span>Label</span>,
};

export const WithValueDisplay = Template.bind({});
WithValueDisplay.args = {
  ...Basic.args,
  valueDisplayFormat: 'fraction',
  valueUnits: 'units',
  showValue: true,
};

export const WithValueIcon = Template.bind({});
WithValueIcon.args = {
  ...Basic.args,
  valueDisplayFormat: 'fraction',
  valueUnits: 'units',
  showValue: true,
  showIcon: true,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...Basic.args,
  description: <span>Helper text</span>,
};

export const Generated = () => {};
