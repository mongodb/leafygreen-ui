import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Box from '.';

storiesOf('Box', module)
  .add('Default', () => {
    const CustomBox = select(
      'button',
      { default: 'div', button: 'button', span: 'span' },
      'div',
    );

    return (
      <Box href={text('href', '')} component={CustomBox}>
        {text('Children', 'I am a box element')}
      </Box>
    );
  })
  .add('Anchor', () => (
    <Box href="https://mongodb.design">
      {text('Children', 'I am an anchor tag')}
    </Box>
  ))
  .add('Custom', () => {
    const CustomBox = select(
      'button',
      { button: 'button', span: 'span' },
      'button',
    );

    return (
      <Box component={CustomBox}>
        {text('Children', 'I am a custom element')}
      </Box>
    );
  });
