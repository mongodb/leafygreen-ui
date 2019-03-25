import React, { Component } from 'react';
import Portal from './Portal';
import { storiesOf } from '@storybook/react';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const portalChildrenStyle = css`
  text-align: center;
`;

storiesOf('Portal', module).add('Default', () => (
  <section className="storybook-container">
    <Portal>
      <div className={portalChildrenStyle}>
        Portals transport their children to a <code>div</code> that is appended to the end of the <code>documet.body</code> to or a <code>node</code> that can be specified with a <code>container</code> prop.
      </div>
    </Portal>
  </section>
));
