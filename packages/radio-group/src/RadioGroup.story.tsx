import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Size } from './types';
import { Radio, RadioGroup } from '.';

function ControlledRadioGroup() {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const changeHandler = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  const darkMode = boolean('darkMode', false);

  return (
    <div>
      <RadioGroup
        size={select('size', Object.values(Size), 'default')}
        darkMode={darkMode}
        onChange={changeHandler}
        value={activeRadio}
        className={css`
          background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
          padding: 20px;
        `}
      >
        <Radio checked={activeRadio === 'test1'} value="test1">
          {text('Radio Content', ' Lorem ipsum dolor sit amet')}
        </Radio>
        <Radio checked={activeRadio === 'test2'} value="test2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Radio>
        <Radio checked={activeRadio === 'test3'} value="test3">
          Duis aute irure dolor in reprehenderit in voluptate
        </Radio>
        <Radio checked={activeRadio === 'test4'} value="test4" disabled>
          Excepteur sint occaecat cupidatat non proident
        </Radio>
      </RadioGroup>
    </div>
  );
}

storiesOf('Packages/RadioGroup', module)
  .add('Uncontrolled', () => {
    const darkMode = boolean('darkMode', false);

    return (
      <RadioGroup
        size={select('size', Object.values(Size), 'default')}
        name="radio-group-default"
        darkMode={darkMode}
        className={css`
          background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
          padding: 20px;
        `}
      >
        <Radio value="1">Radio Input Copy</Radio>
        <Radio value="2">{text('Label text', 'Radio Input Copy')}</Radio>
        <Radio default value="3">
          Radio Input Copy
        </Radio>
        <Radio disabled={boolean('Disabled', true)} value="Selection-4">
          Taj Mahal
        </Radio>
      </RadioGroup>
    );
  })
  .add('Controlled', () => <ControlledRadioGroup />);
