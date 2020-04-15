import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Box from '.';

storiesOf('Box', module)
  .add('Default', () => <Box>I am a div</Box>)
  .add('Anchor', () => (
    <Box component="a" href="https://mongodb.design">
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
