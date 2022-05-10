import React, { useState } from 'react';
import { Meta, storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import RadioBoxGroup from './RadioBoxGroup';
import RadioBox from './RadioBox';
import Size from './Size';

export default {
  title: 'Packages/RadioBoxGroup',
  component: RadioBoxGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
} as Meta<typeof RadioBoxGroup>;

export const Uncontrolled = args => (
  <LeafyGreenProvider>
    <RadioBoxGroup name="radio-box-group-default" {...args}>
      <RadioBox value="1">Option One</RadioBox>
      <RadioBox value="2">Option Two</RadioBox>
      <RadioBox default value="3">
        Option Three
      </RadioBox>
      <RadioBox disabled={true} value="option-4">
        Disabled Option
      </RadioBox>
    </RadioBoxGroup>
  </LeafyGreenProvider>
);

export const Controlled = args => {
  const [activeRadioBox, setActiveRadioBox] = useState<string>('test1');

  const handleChange = (e: React.FormEvent) => {
    setActiveRadioBox((e.target as HTMLInputElement).value);
  };

  return (
    <Uncontrolled {...args} onChange={handleChange} value={activeRadioBox} />
  );
};
