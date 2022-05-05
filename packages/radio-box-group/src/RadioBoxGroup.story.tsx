import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import RadioBoxGroup from './RadioBoxGroup';
import RadioBox from './RadioBox';
import Size from './Size';

function ControlledRadioBoxGroup() {
  const [activeRadioBox, setActiveRadioBox] = useState<any>('test1');

  const changeHandler = (e: React.FormEvent) => {
    setActiveRadioBox((e.target as HTMLInputElement).value);
  };

  return (
    <LeafyGreenProvider>
      <div
        className={css`
          width: 100%;
          padding: 2rem;
        `}
      >
        <RadioBoxGroup
          onChange={changeHandler}
          value={activeRadioBox}
          size={select(
            'Size',
            Object.values(Size) as Array<Size>,
            Size.Default,
          )}
        >
          <RadioBox value="test1">
            {text('RadioBox Content', 'Option 1')}
          </RadioBox>
          <RadioBox value="test2">Option 2</RadioBox>
          <RadioBox value="test3">Option 3</RadioBox>
        </RadioBoxGroup>
      </div>
    </LeafyGreenProvider>
  );
}

storiesOf('Packages/RadioBoxGroup', module)
  .add('Uncontrolled', () => (
    <LeafyGreenProvider>
      <div
        className={css`
          width: 100%;
          padding: 2rem;
        `}
      >
        <RadioBoxGroup
          size={select(
            'Size',
            Object.values(Size) as Array<Size>,
            Size.Default,
          )}
          name="radio-box-group-default"
        >
          <RadioBox value="1">Option One</RadioBox>
          <RadioBox value="2">{text('Label text', 'Option Two')}</RadioBox>
          <RadioBox default value="3">
            Option Three
          </RadioBox>
          <RadioBox disabled={boolean('Disabled', true)} value="option-4">
            Disabled Option
          </RadioBox>
        </RadioBoxGroup>
      </div>
    </LeafyGreenProvider>
  ))
  .add('Controlled', () => <ControlledRadioBoxGroup />);
