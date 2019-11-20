import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Variant } from './types';
import { Logo, LogoMark } from '.';

storiesOf('Logo', module)
  .add('LogoMark', () => {
    const variant = select(
      'Variant',
      Object.values(Variant) as Array<Variant>,
      Variant.Dark,
    );

    const background = css`
      padding: 10px;
      background-color: ${variant === Variant.Dark
        ? uiColors.gray.light3
        : uiColors.gray.dark3};
    `;

    return (
      <div className={background}>
        <LogoMark
          variant={variant}
          knockout={boolean('Knockout', false)}
          height={number('Height', 40)}
        />
      </div>
    );
  })
  .add('Logo', () => {
    const variant = select(
      'Variant',
      Object.values(Variant) as Array<Variant>,
      Variant.Dark,
    );

    const background = css`
      padding: 10px;
      background-color: ${variant === Variant.Dark
        ? uiColors.gray.light3
        : uiColors.gray.dark3};
    `;

    return (
      <div className={background}>
        <Logo
          variant={variant}
          knockout={boolean('Knockout', false)}
          height={number('Height', 40)}
        />
      </div>
    );
  });
