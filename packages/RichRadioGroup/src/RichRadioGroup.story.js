import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import RichRadioGroup from './RichRadioGroup';
import RichRadioInput from './RichRadioInput';

storiesOf('RichRadioGroup', module)
  .add('Default', () => (
    <section className="storybook-container">
      <RichRadioGroup
        size={select(
          'Size',
          ['tight', 'full', 'small', 'medium', 'large'],
          'medium',
        )}
      >
        <RichRadioInput value="option-1" label="Brooke" />
        <RichRadioInput value="option-2" label="Scarlett" />
      </RichRadioGroup>
    </section>
  ))
  .add('Green', () => (
    <section className="storybook-container">
      <RichRadioGroup
        variant="green"
        size={select(
          'Size',
          ['tight', 'full', 'small', 'medium', 'large'],
          'medium',
        )}
      >
        <RichRadioInput value="option-1" label="Brooke" />
        <RichRadioInput value="option-2" label="Scarlett" />
      </RichRadioGroup>
    </section>
  ));
