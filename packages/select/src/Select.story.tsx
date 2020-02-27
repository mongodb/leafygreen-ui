import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Select, { Option } from '.';
import { SelectProps } from './Select';

function StatefulWrapper<OptionT>(
  props: Omit<SelectProps<OptionT>, 'value' | 'onChange'>,
) {
  const [value, setValue] = useState<OptionT | undefined>(undefined);

  return <Select {...props} value={value} onChange={setValue} />;
}

storiesOf('Select', module).add('Default', () => (
  <StatefulWrapper<string> placeholder="Select a value...">
    <Option value="a">A!</Option>
    <Option value="b">B!</Option>
    <Option value="c">C!</Option>
  </StatefulWrapper>
));
