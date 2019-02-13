import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { ccClassName, emotion } from '@leafygreen-ui/lib';
import Toggle from '.';

storiesOf('Toggle', module)
  .add('Default', () => (
    <section className="storybook-container">
      <Toggle
        size={select('Size', ['default', 'small', 'xsmall'], 'default')}
        disabled={boolean('Disabled', false)}
      />
    </section>
  ))
  .add('Dark', () => (
    <section
      className={ccClassName(
        'storybook-container',
        emotion.css`
          background-color: #464C4F;
          padding: 2rem;
        `,
      )}
    >
      <Toggle
        size={select('Size', ['default', 'small', 'xsmall'], 'default')}
        variant="dark"
        disabled={boolean('Disabled', false)}
      />
    </section>
  ));
