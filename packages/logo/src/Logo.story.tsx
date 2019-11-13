import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Variant } from './types';
import { Logo, LogoMark } from '.';

const background = css`
  padding: 10px;
  background-color: ${uiColors.gray.base};
`;

storiesOf('Logo', module)
  .add('LogoMark', () => (
    <div className={background}>
      <LogoMark
        variant={select(
          'Variant',
          Object.values(Variant) as Array<Variant>,
          Variant.Dark,
        )}
        knockout={boolean('Knockout', false)}
        height={number('Height', 40)}
      />
    </div>
  ))
  .add('Logo', () => (
    <div className={background}>
      <Logo
        variant={select(
          'Variant',
          Object.values(Variant) as Array<Variant>,
          Variant.Dark,
        )}
        knockout={boolean('Knockout', false)}
        height={number('Height', 40)}
      />
    </div>
  ));
