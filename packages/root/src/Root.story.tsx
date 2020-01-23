import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Root from '.';

storiesOf('Root', module)
  .add('Anchor', () => (
    <Root href="https://mongodb.design">
      {text('Children', 'I am an anchor tag')}
    </Root>
  ))
  .add('Custom', () => {
    const CustomRoot = select(
      'div',
      { div: 'div', span: 'span', button: 'button' },
      'div',
    );

    return (
      <Root as={CustomRoot}>{text('Children', 'I am a custom element')}</Root>
    );
  });
