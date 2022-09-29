import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Option, OptionGroup, Select } from '.';
import { SelectProps } from './types';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import { storybookArgTypes } from '@leafygreen-ui/lib';

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    placeholder: 'Select',
    disabled: false,
    allowDeselect: false,
    darkMode: false,
    children: [
      <Option key="long" value="long">
        Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget
        risus varius blandit sit amet non magna.
      </Option>,
      <OptionGroup key="Common" label="Common">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
      </OptionGroup>,
      <OptionGroup key="Less common" label="Less common">
        <Option value="hamster">Hamster</Option>
        <Option value="parrot">Parrot</Option>
      </OptionGroup>,
      <Option key="iguana" value="iguana">
        Mexican spiny-tailed iguana
      </Option>,
      <Option key="spider" value="spider" disabled>
        Spider
      </Option>,
    ],
  },
  argTypes: {
    children: { control: false },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    'aria-labelledby': { control: 'text' },
    description: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
    id: { control: 'text' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    readOnly: { control: 'boolean' },
    errorMessage: { control: 'text' },
    allowDeselect: { control: 'boolean' },
  },
} as Meta<typeof Select>;

export const Uncontrolled = ({ className, ...args }: SelectProps) => (
  <Select
    data-test="hello-world"
    className={cx(
      css`
        min-width: 200px;
        max-width: 400px;
      `,
      className,
    )}
    {...args}
  />
);
export const Controlled = ({
  defaultValue,
  readOnly,
  ...args
}: SelectProps) => {
  const [value, setValue] = useState('cat');
  return (
    <Uncontrolled
      {...args}
      readOnly={false}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithIcons = (args: SelectProps) => <Uncontrolled {...args} />;
WithIcons.args = {
  children: [
    <OptionGroup key="Common" label="Common">
      <Option glyph={<BeakerIcon />} value="dog">
        Dog
      </Option>
      <Option glyph={<BeakerIcon />} value="cat">
        Cat
      </Option>
    </OptionGroup>,
    <OptionGroup key="Less common" label="Less common">
      <Option glyph={<BeakerIcon />} value="hamster">
        Hamster
      </Option>
      <Option glyph={<BeakerIcon />} value="parrot">
        Parrot
      </Option>
    </OptionGroup>,
    <Option glyph={<BeakerIcon />} key="iguana" value="iguana">
      Mexican spiny-tailed iguana
    </Option>,
    <Option glyph={<BeakerIcon />} key="spider" value="spider" disabled>
      Spider
    </Option>,
  ],
};
