import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import Button, { Size, Variant } from '.';

const buttonClass = css`
  & + & {
    margin-left: 0.5rem;
  }
`;

storiesOf('Buttons', module)
  .add('Default', () => (
    <Button
      size={select('Size', Object.values(Size) as Array<Size>, Size.Normal)}
      variant={select(
        'Variant',
        Object.values(Variant) as Array<Variant>,
        Variant.Default,
      )}
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
  .add('as custom component', () => {
    const CustomRoot = select(
      'div',
      { div: 'div', span: 'span', button: 'button' },
      'div',
    );

    function CustomElement(props: object): React.ReactElement {
      return <CustomRoot {...props} />;
    }

    return (
      <Button
        as={CustomElement}
        size={select('Size', Object.values(Size) as Array<Size>, Size.Normal)}
        variant={select(
          'Variant',
          Object.values(Variant) as Array<Variant>,
          Variant.Default,
        )}
        disabled={boolean('Disabled', false)}
        className={buttonClass}
        glyph={<Icon glyph='Edit'/>}
      >
        {text('Children', 'Button')}
      </Button>
    );
  });
