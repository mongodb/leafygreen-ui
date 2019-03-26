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
    <section className="storybook-container">
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
    </section>
  ))
  .add('Primary', () => (
    <section className="storybook-container">
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
    </section>
  ))
  .add('Info', () => (
    <section className="storybook-container">
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
    </section>
  ))
  .add('Danger', () => (
    <section className="storybook-container">
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
    </section>
  ))
  .add('Dark', () => (
    <section className="storybook-container">
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
    </section>
  ));
