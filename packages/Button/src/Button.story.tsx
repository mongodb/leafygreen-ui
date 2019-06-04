import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { css } from 'react-emotion';
import Button, { Size, Variant } from '.';

const buttonClass = css`
  & + & {
    margin-left: 0.5rem;
  }
`;

function CustomElement({
  customProp,
  ...rest
}: {
  customProp: string;
}): React.ReactElement {
  return (
    <div>
      Lookit, {customProp}!<br />
      <button {...rest} />
    </div>
  );
}

storiesOf('Buttons', module)
  .add('Default', () => (
    <Button
      size={select<Size>(
        'Size',
        ['xsmall', 'small', 'normal', 'large'],
        'normal',
      )}
      variant="default"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={
        /*
        NOTE(JeT):
        TS doesn't like string | null here, it wants you to consistently choose one or the other,
        and tries to derive the other props based on that distinction.
        In practice, I don't expect people to be switching this prop dynamically very often.
        */
        select(
          'Href',
          { 'mongodb.design': 'http://mongodb.design', none: null },
          null,
        ) as any
      }
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Primary', () => (
    <Button
      size={select<Size>(
        'Size',
        ['xsmall', 'small', 'normal', 'large'],
        'normal',
      )}
      variant="primary"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={
        select(
          'Href',
          { 'mongodb.design': 'http://mongodb.design', none: null },
          null,
        ) as any
      }
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Info', () => (
    <Button
      size={select<Size>(
        'Size',
        ['xsmall', 'small', 'normal', 'large'],
        'normal',
      )}
      variant="info"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={
        select(
          'Href',
          { 'mongodb.design': 'http://mongodb.design', none: null },
          null,
        ) as any
      }
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Danger', () => (
    <Button
      size={select<Size>(
        'Size',
        ['xsmall', 'small', 'normal', 'large'],
        'normal',
      )}
      variant="danger"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={
        select(
          'Href',
          { 'mongodb.design': 'http://mongodb.design', none: null },
          null,
        ) as any
      }
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('Dark', () => (
    <Button
      size={select<Size>(
        'Size',
        ['xsmall', 'small', 'normal', 'large'],
        'normal',
      )}
      variant="dark"
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={
        select(
          'Href',
          { 'mongodb.design': 'http://mongodb.design', none: null },
          null,
        ) as any
      }
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ))
  .add('as custom component', () => (
    <Button
      as={CustomElement}
      customProp={text('Custom Prop', 'custom')}
      size={select<Size>(
        'Size',
        ['xsmall', 'small', 'normal', 'large'],
        'normal',
      )}
      variant={select<Variant>(
        'Variant',
        ['default', 'primary', 'info', 'danger', 'dark'],
        'default',
      )}
      title={text('Title', 'The button title')}
      disabled={boolean('Disabled', false)}
      href={select(
        'Href',
        { 'mongodb.design': 'http://mongodb.design', none: null },
        null,
      )}
      className={buttonClass}
    >
      {text('Children', 'Button')}
    </Button>
  ));
