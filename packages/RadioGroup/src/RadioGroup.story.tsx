import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import emotion from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';
import { Radio, RadioGroup, Variant } from '.';

storiesOf('RadioGroup', module)
  .add('Default', () => (
    <RadioGroup name="radio-group-default">
      <Radio value="1">Option One</Radio>
      <Radio value="2">{text('Label text', 'Option Two')}</Radio>
      <Radio value="3">Option Three</Radio>
      <Radio disabled={boolean('Disabled', true)} value="option-4">
        Disabled Option
      </Radio>
    </RadioGroup>
  ))
  .add('Light', () => (
    <RadioGroup
      name="radio-group-light"
      variant={Variant.Light}
      className={emotion.css`background-color: ${colors.gray[1]}`}
    >
      <Radio value="option-1">Option One</Radio>
      <Radio value="option-2">{text('Label text', 'Option Two')}</Radio>
      <Radio value="option-3">Option Three</Radio>
      <Radio disabled={boolean('Disabled', true)} value="4">
        Disabled Option
      </Radio>
    </RadioGroup>
  ));
