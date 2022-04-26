import React from 'react';
import Portal from './Portal';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';

const portalChildrenStyle = css`
  text-align: center;
`;

function getRoot() {
  const root = document.getElementById('root');

  if (root == null) {
    throw new Error('Could not find root element');
  }

  return root;
}

storiesOf('Packages/Portal', module).add('Default', () => (
  <Portal container={getRoot()}>
    <div className={portalChildrenStyle}>
      Portals transport their children to a <code>div</code> that is appended to
      the end of the <code>document.body</code> to or a <code>node</code> that
      can be specified with a <code>container</code> prop.
    </div>
  </Portal>
));
