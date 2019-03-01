import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import RichRadioGroup from './RichRadioGroup';
import RichRadioInput from './RichRadioInput'

storiesOf('RichRadioGroup', module).add('Default', () => (
  <section className="storybook-container">
    <RichRadioGroup size="small" value="option-1">
      <RichRadioInput value="option-1" label="Brooke" />
      <RichRadioInput value="option-2" label="Scarlett" />
    </RichRadioGroup>
  </section>
));
