import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { css } from 'react-emotion';
import RadioGroup from '.';
import RadioButton from '../../RadioButton/src/index';

storiesOf('RadioGroup', module).add('Default', () => (
  <section className="storybook-container">
    <RadioGroup>
      <RadioButton value="option-1">Option One</RadioButton>
      <RadioButton value="option-2">Option Two</RadioButton>
      <RadioButton value="option-3">Option Three</RadioButton>
      <RadioButton disabled value="option-4">
        Disabled Option
      </RadioButton>
    </RadioGroup>
  </section>
));
