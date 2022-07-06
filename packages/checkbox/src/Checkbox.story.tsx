import { css } from '@leafygreen-ui/emotion';
import { Story } from '@storybook/react';
import React from 'react';
import Checkbox from '.';
import { CheckboxProps } from './types';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    children: defaultArgTypes.children,
    darkMode: defaultArgTypes.darkMode,
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    bold: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    animate: { control: 'boolean', default: true },
    onChange: { control: 'none' },
    baseFontSize: {
      options: [14, 16],
      control: { type: 'radio' },
    },
  },
};

type BaseFontSize = 14 | 16;

const Template: Story<CheckboxProps & { baseFontSize: BaseFontSize }> = ({
  // eslint-disable-next-line react/prop-types
  baseFontSize,
  ...args
}) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Checkbox {...args} />
  </LeafygreenProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  animate: true,
  label: 'I agree to this thing.',
  description:
    'Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  className: css`
    max-width: 700px;
  `,
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
