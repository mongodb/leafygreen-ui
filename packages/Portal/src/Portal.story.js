import React, { Component } from 'react';
import Portal from './Portal';
import { storiesOf } from '@storybook/react';
import { emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const portalChildrenStyle = css`
  text-align: center;
`;

storiesOf('Portal', module).add('Default', () => (
  <Portal container={document.getElementById('root')}>
    <div className={portalChildrenStyle}>
      Portals transport their children to a <code>div</code> that is appended to
      the end of the <code>documet.body</code> to or a <code>node</code> that
      can be specified with a <code>container</code> prop.
    </div>
  </Portal>
));
