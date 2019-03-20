import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { css } from 'react-emotion';
import Button from '.';

import Radio from '../../RadioGroup/src/Radio';

const buttonClass = css`
  & + & {
    margin-left: 0.5rem;
  }
`;

storiesOf('Buttons', module)
  .add('Extra Small', () => (
    <section className="storybook-container">
      <Button
        size="xsmall"
        variant={select(
          'Variant',
          ['default', 'primary', 'info', 'danger', 'dark'],
          'default',
        )}
        title={text('Title', 'The button title')}
        disabled={boolean('Disabled', false)}
        className={buttonClass}
      >
        {text('Children', 'Button')}
      </Button>
    </section>
  ))
  .add('Small', () => (
    <section className="storybook-container">
      <Button
        size="small"
        variant={select(
          'Variant',
          ['default', 'primary', 'info', 'danger', 'dark'],
          'default',
        )}
        title={null /* text('Title', 'The button title') */}
        disabled={boolean('Disabled', false)}
        className={buttonClass}
      >
        {text('Children', 'Button')}
      </Button>
    </section>
  ))
  .add('Normal', () => (
    <section className="storybook-container">
      <Button
        size="normal"
        variant={select(
          'Variant',
          ['default', 'primary', 'info', 'danger', 'dark'],
          'default',
        )}
        title={text('Title', 'The button title')}
        disabled={boolean('Disabled', false)}
        className={buttonClass}
      >
        {text('Children', 'Button')}
      </Button>
    </section>
  ))
  .add('Large', () => (
    <section className="storybook-container">
      <Button
        size="large"
        href="https://google.com"
        variant={select(
          'Variant',
          ['default', 'primary', 'info', 'danger', 'dark'],
          'default',
        )}
        title={text('Title', 'The button title')}
        disabled={boolean('Disabled', false)}
        className={buttonClass}
      >
        {text('Children', 'Button')}
      </Button>
    </section>
  ));
