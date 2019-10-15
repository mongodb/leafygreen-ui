import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import NavItem from '.';

storiesOf('NavItem', module).add('default', () => (
  <div>
    <NavItem active>Active Nav Item</NavItem>
    <NavItem
      disabled={boolean('Disabled', true)}
      description="I am a description"
    >
      Disabled Nav Item
    </NavItem>
    <NavItem description="I am also a description">
      Menu Item With Description
    </NavItem>
    <NavItem href="http://mongodb.design">I am a link!</NavItem>
  </div>
));
