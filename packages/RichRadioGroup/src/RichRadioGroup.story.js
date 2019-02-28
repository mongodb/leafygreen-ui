import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import RichRadioGroup from '.';

storiesOf('RichRadioGroup', module).add('Default', () => (
  <section className="storybook-container">
    <RichRadioGroup>
      nlah 
    </RichRadioGroup>
  </section>
));
