import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Radio, RadioGroup } from '.';
import { RadioGroupProps } from './RadioGroup';

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

export const Uncontrolled = ({
  className,
  darkMode,
  ...args
}: RadioGroupProps) => (
  <RadioGroup
    name="radio-group-default"
    darkMode={darkMode}
    className={cx(
      css`
        background-color: ${darkMode ? palette.gray.dark3 : palette.white};
        padding: 20px;
      `,
      className,
    )}
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
);

export const Controlled = (args: RadioGroupProps) => {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const handleChange = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return <Uncontrolled {...args} onChange={handleChange} value={activeRadio} />;
};
