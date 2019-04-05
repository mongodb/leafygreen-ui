import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import Toggle from '.';

const containerStyle = emotion.css`padding: 2rem; text-align: center;`;

storiesOf('Toggle', module)
  .add('Default', () => (
    <div className={containerStyle}>
      <Toggle
        size={select('Size', ['default', 'small', 'xsmall'], 'default')}
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
        size={select('Size', ['default', 'small', 'xsmall'], 'default')}
        variant="dark"
        disabled={boolean('Disabled', false)}
      />
    </div>
  ));
