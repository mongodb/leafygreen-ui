import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafygreenProvider, {
  BaseFontSize,
} from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes } from '@leafygreen-ui/lib';

import { CheckboxProps } from './types';
import Checkbox from '.';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    controls: {
      exclude: ['children', 'className', 'aria-label', 'onChange'],
    },
    default: 'Uncontrolled',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
    checked: { control: 'none' },
    disabled: { control: 'boolean' },
    bold: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    animate: { control: 'boolean', default: true },
    baseFontSize: {
      options: [13, 16],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: Story<CheckboxProps & { baseFontSize: BaseFontSize }> = ({
  // eslint-disable-next-line react/prop-types
  baseFontSize,
  ...args
}) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Checkbox {...args} />
  </LeafygreenProvider>
);

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  animate: true,
  label: 'I agree to this thing.',
  description:
    'Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  className: css`
    max-width: 700px;
  `,
};

export const Controlled = Template.bind({});
Controlled.argTypes = {
  checked: { control: 'boolean' },
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  label:
    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
};

export const WrappedLabel = Template.bind({});
WrappedLabel.args = {
  label:
    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  className: css`
    max-width: 256px;
  `,
};
export const CheckOnly = Template.bind({});
CheckOnly.args = {
  'aria-label': 'Label',
};
