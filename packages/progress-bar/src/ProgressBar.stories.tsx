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
        darkMode: [false, true],
        variant: ['info', 'success', 'warning', 'error'],
        size: ['default', 'small', 'large'],
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
  value: 48,
  maxValue: 200,
  formatValue: 'fraction',
  showIcon: true,
  label: <span>Label</span>,
  description: <span>Helper text</span>,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...LiveExample.args,
  disabled: true,
};

export const Basic = Template.bind({});
Basic.args = {
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
  formatValue: 'percentage',
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
