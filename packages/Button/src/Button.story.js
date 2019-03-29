import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { css } from 'react-emotion';
import Button from '.';

const buttonClass = css`
  & + & {
    margin-left: 0.5rem;
  }
`;

storiesOf('Buttons', module)
  .add('Default', () => (
    <Button
      size={select('Size', ['xsmall', 'small', 'normal', 'large'], 'normal')}
      variant="default"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={select('Href', ['http://mongodb.design', null], null)}
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Primary', () => (
    <Button
      size={select('Size', ['xsmall', 'small', 'normal', 'large'], 'normal')}
      variant="primary"
      title={null /* text('Title', 'The button title') */}
      disabled={boolean('Disabled', false)}
      href={select('Href', ['http://mongodb.design', null], null)}
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Info', () => (
    <Button
      size={select('Size', ['xsmall', 'small', 'normal', 'large'], 'normal')}
      variant="info"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={select('Href', ['http://mongodb.design', null], null)}
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Danger', () => (
    <Button
      size={select('Size', ['xsmall', 'small', 'normal', 'large'], 'normal')}
      variant="danger"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={select('Href', ['http://mongodb.design', null], null)}
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Dark', () => (
    <Button
      size={select('Size', ['xsmall', 'small', 'normal', 'large'], 'normal')}
      variant="dark"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={select('Href', ['http://mongodb.design', null], null)}
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ));
