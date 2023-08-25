import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import Portal, { PortalProps } from '.';

const portalChildrenStyle = css`
  text-align: center;
`;

function getRoot() {
  const root =
    document.getElementById('root') ||
    document.getElementById('storybook-root') ||
    document.getElementById('story-container');

  if (root == null) {
    throw new Error('Could not find root element');
  }

  return root;
}

const meta: StoryMetaType<typeof Portal> = {
  title: 'Components/Portal',
  component: Portal,
  args: {
    container: getRoot(),
    children: (
      <div className={portalChildrenStyle}>
        Portals transport their children to a <code>div</code> that is appended
        to the end of the <code>document.body</code> to or a <code>node</code>{' '}
        that can be specified with a <code>container</code> prop.
      </div>
    ),
  },
  argTypes: {
    className: {
      type: 'string',
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'container'],
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

export const Basic: StoryFn<PortalProps> = (args: PortalProps) => (
  <Portal {...args} />
);
