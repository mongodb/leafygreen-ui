import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import Card from './Card';

const containerStyle = css`
  padding: 16px;
  height: 70px;
  width: 140px;
  display: flex;
  align-items: center;
  text-align: center;
`;

storiesOf('Card', module).add('Default', () => {
  const hasClickBehavior = boolean('Has click behavior', true);

  return (
    <Card
      as="div"
      className={containerStyle}
      onClick={hasClickBehavior ? () => alert('hello') : undefined}
    >
      This is a card component
    </Card>
  );
});
