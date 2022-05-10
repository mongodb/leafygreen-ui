import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Radio, RadioGroup } from '.';

export default {
  title: 'Packages/RadioGroup',
  component: RadioGroup,
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
    darkMode: {
      control: 'boolean',
    },
  },
} as Meta<typeof RadioGroup>;

export const Uncontrolled = ({ className, darkMode, ...args }) => (
  <RadioGroup
    name="radio-group-default"
    darkMode={darkMode}
    className={cx(css`
      background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
      padding: 20px;
    `, className)}
    {...args}
  >
    <Radio value="1">Radio Input Copy</Radio>
    <Radio value="2">Radio Input Copy</Radio>
    <Radio default value="3">
      Radio Input Copy
    </Radio>
    <Radio disabled value="Selection-4">
      Disabled Option
    </Radio>
  </RadioGroup>
)

export const Controlled = (args) => {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const handleChange = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };
  return <Uncontrolled 
    {...args}
    onChange={handleChange}
    value={activeRadio}
   />;
}