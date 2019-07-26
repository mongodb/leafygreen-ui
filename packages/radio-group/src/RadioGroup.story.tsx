import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';
import { Radio, RadioGroup, Variant } from '.';

function ControlledRadioGroup() {
  const [activeRadio, setActiveRadio] = useState<any>('test1');

  const changeHandler = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return (
    <div>
      <RadioGroup
        onChange={changeHandler}
        value={activeRadio}
        variant={Variant.Light}
        className={css`
          background-color: ${colors.gray[1]};
        `}
      >
        <Radio value="test1">{text('Radio Content', 'Option 1')}</Radio>
        <Radio value="test2">Option 2</Radio>
        <Radio value="test3">Option 3</Radio>
      </RadioGroup>
    </div>
  );
}

storiesOf('RadioGroup', module)
  .add('Uncontrolled', () => (
    <RadioGroup name="radio-group-default">
      <Radio value="1">Option One</Radio>
      <Radio value="2">{text('Label text', 'Option Two')}</Radio>
      <Radio default value="3">
        Option Three
      </Radio>
      <Radio disabled={boolean('Disabled', true)} value="option-4">
        Disabled Option
      </Radio>
    </RadioGroup>
  ))
  .add('Controlled', () => <ControlledRadioGroup />);
