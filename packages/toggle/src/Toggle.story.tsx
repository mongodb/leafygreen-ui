import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Toggle, { Size, Variant } from '.';

storiesOf('Toggle', module).add('Default', () => {
  const variant = select(
    'Variant',
    Object.values(Variant) as Array<Variant>,
    Variant.Default,
  );

  return (
    <div
      className={css`
        background-color: ${variant === 'default'
          ? uiColors.gray.light1[1]
          : uiColors.gray.dark1};
        padding: 20px;
      `}
    >
      `
      <Toggle
        variant={variant}
        size={select('Size', Object.values(Size) as Array<Size>, Size.Default)}
        disabled={boolean('Disabled', false)}
      />
    </div>
  );
});
