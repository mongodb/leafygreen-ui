import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Toggle, { Size, Variant } from '.';

const containerStyle = css`
  padding: 2rem;
  text-align: center;
`;

storiesOf('Toggle', module).add('Default', () => (
  <div className={containerStyle}>
    <Toggle
      variant={select(
        'Variant',
        Object.values(Variant) as Array<Variant>,
        Variant.Default,
      )}
      size={select('Size', Object.values(Size) as Array<Size>, Size.Default)}
      disabled={boolean('Disabled', false)}
    />
  </div>
));
