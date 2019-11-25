import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Toggle, { Size, Variant } from '.';

const containerStyle = css`
  padding: 2rem;
  text-align: center;
`;

storiesOf('Toggle', module)
  .add('Default', () => (
    <div className={containerStyle}>
      <Toggle
        size={select('Size', Object.values(Size) as Size[], Size.Default)}
        disabled={boolean('Disabled', false)}
      />
    </div>
  ))
  .add('Dark', () => (
    <div
      className={css`
        ${containerStyle};
        background-color: #464c4f;
      `}
    >
      <Toggle
        size={select('Size', Object.values(Size) as Size[], Size.Default)}
        variant={Variant.Dark}
        disabled={boolean('Disabled', false)}
      />
    </div>
  ));
