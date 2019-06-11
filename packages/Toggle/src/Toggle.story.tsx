import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import Toggle, { Size, Variant } from '.';

const containerStyle = emotion.css`padding: 2rem; text-align: center;`;

storiesOf('Toggle', module)
  .add('Default', () => (
    <div className={containerStyle}>
      <Toggle
        size={select('Size', Object.values(Size) as Array<Size>, Size.Default)}
        disabled={boolean('Disabled', false)}
      />
    </div>
  ))
  .add('Dark', () => (
    <div
      className={emotion.css`
          ${containerStyle};
          background-color: #464C4F;
        `}
    >
      <Toggle
        size={select('Size', Object.values(Size) as Array<Size>, Size.Default)}
        variant={Variant.Dark}
        disabled={boolean('Disabled', false)}
      />
    </div>
  ));
