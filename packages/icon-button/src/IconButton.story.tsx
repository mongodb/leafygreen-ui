import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import IconButton, { Variant, Size } from './IconButton';

const background = css`
  width: 60px;
  height: 60px;
  background-color: ${uiColors.gray.dark3};
  display: flex;
  align-items: center;
  justify-content: center;
`;

storiesOf('IconButton', module)
  .add('Default', () => {
    const size = select(
      'Size',
      Object.values(Size) as Array<Size>,
      Size.Default,
    );

    return (
      <IconButton
        size={size}
        variant={select(
          'variant',
          Object.values(Variant) as Array<Variant>,
          Variant.Light,
        )}
        disabled={boolean('disabled', false)}
        ariaLabel="Ellipsis"
      >
        <Icon glyph="Ellipsis" size={size} />
      </IconButton>
    );
  })
  .add('Link', () => {
    const size = select(
      'Size',
      Object.values(Size) as Array<Size>,
      Size.Default,
    );

    return (
      <div className={background}>
        <IconButton
          size={size}
          ariaLabel="Ellipsis"
          href="https://mongodb.design"
          variant={select(
            'variant',
            Object.values(Variant) as Array<Variant>,
            Variant.Dark,
          )}
          disabled={boolean('disabled', false)}
        >
          <Icon glyph="Ellipsis" size={size} />
        </IconButton>
      </div>
    );
  });
