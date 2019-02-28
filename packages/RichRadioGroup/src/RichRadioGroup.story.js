import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import RichRadioGroup from '.';


storiesOf('RadioGroup', module)
  .add('Default', () => (
    <section className="storybook-container">
      <RichRadioGroup name="radio-group-default">
     
      </RichRadioGroup>
    </section>
  ));
