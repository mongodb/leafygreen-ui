import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import { StoryMeta } from '@leafygreen-ui/lib';

import Portal from '.';

const portalChildrenStyle = css`
  text-align: center;
`;

function getRoot() {
  const root =
    document.getElementById('root') ||
    document.getElementById('story-container');

  if (root == null) {
    throw new Error('Could not find root element');
  }

  return root;
}

export default StoryMeta({
  title: 'Components/Portal',
  component: Portal,
  args: {
    container: getRoot(),
  },
  argTypes: {
    className: {
      type: 'string',
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['children', 'container'],
    },
  },
});

export const Basic = () => (
  <Portal container={getRoot()}>
    <div className={portalChildrenStyle}>
      Portals transport their children to a <code>div</code> that is appended to
      the end of the <code>document.body</code> to or a <code>node</code> that
      can be specified with a <code>container</code> prop.
    </div>
  </Portal>
);
