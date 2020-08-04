import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Radio, RadioGroup, Variant } from '.';

function ControlledRadioGroup() {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const changeHandler = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return (
    <div>
      <RadioGroup onChange={changeHandler} value={activeRadio}>
        <Radio value="test1">{text('Radio Content', 'Option 1')}</Radio>
        <Radio value="test2">Option 2</Radio>
        <Radio value="test3">Option 3</Radio>
        <Radio value="test4" disabled checked={true}>
          Option 4
        </Radio>
      </RadioGroup>
    </div>
  );
}

storiesOf('RadioGroup', module)
  .add('Uncontrolled', () => {
    const variant = select('variant', Object.values(Variant), Variant.Default);

    return (
      <RadioGroup
        name="radio-group-default"
        variant={variant}
        className={css`
          background-color: ${variant === Variant.Default
            ? uiColors.gray.light2
            : uiColors.gray.dark2};
          padding: 20px;
        `}
      >
        <Radio value="1">Option One</Radio>
        <Radio value="2">{text('Label text', 'Option Two')}</Radio>
        <Radio default value="3">
          Option Three
        </Radio>
        <Radio disabled={boolean('Disabled', true)} value="option-4">
          Disabled Option
        </Radio>
      </RadioGroup>
    );
  })
  .add('Controlled', () => <ControlledRadioGroup />);
