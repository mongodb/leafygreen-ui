import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import Card from './Card';

const containerStyle = css`
  padding: 10px;
  height: 70px;
  width: 140px;
  display: flex;
  align-items: center;
  text-align: center;
`;

storiesOf('Card', module).add('Default', () => (
  <Card as="div" className={containerStyle}>
    This is a card component
  </Card>
));
