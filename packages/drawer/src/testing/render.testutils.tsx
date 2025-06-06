/* eslint-disable no-console */
import React from 'react';
import {
  renderAsyncTest,
  RenderAsyncTestReturnType,
} from '@lg-tools/test-harnesses';
import { render, RenderResult } from '@testing-library/react';

import { Drawer } from '../Drawer';
import { DrawerStackProvider } from '../DrawerStackContext';
import {
  DrawerToolbarLayout,
  DrawerToolbarLayoutProps,
} from '../DrawerToolbarLayout';

const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['toolbarData'] = [
  {
    id: 'Code',
    label: 'Code',
    content: <div>Content for Code</div>,
    title: 'Code Title',
    glyph: 'Code',
    onClick: () => {
      console.log('Code clicked');
    },
  },
  {
    id: 'Dashboard',
    label: 'Dashboard',
    content: <div>Content for Dashboard</div>,
    title: 'Dashboard Title',
    glyph: 'Dashboard',
    onClick: () => {
      console.log('Dashboard clicked');
    },
  },
  {
    id: 'Plus',
    label: 'Plus',
    glyph: 'Plus',
    onClick: () => {
      console.log('Plus clicked, does not update drawer');
    },
  },
];

const drawerTest = {
  content: 'Drawer content',
  title: 'Drawer title',
} as const;

export const renderDrawerAsync = (): RenderAsyncTestReturnType => {
  return renderAsyncTest(
    <DrawerStackProvider>
      <Drawer title={drawerTest.title} open>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
    render,
  );
};

export const renderDrawer = (props = {}) => {
  render(
    <DrawerStackProvider>
      <Drawer title={drawerTest.title} {...props}>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
  );
};

export const renderMultipleDrawers = () => {
  render(
    <DrawerStackProvider>
      <Drawer data-lgid="lg-drawer-1" title={`${drawerTest.title} 1`} open>
        {drawerTest.content}
      </Drawer>
      <Drawer data-lgid="lg-drawer-2" title={`${drawerTest.title} 2`} open>
        {drawerTest.content}
      </Drawer>
      <Drawer data-lgid="lg-drawer-3" title={`${drawerTest.title} 3`}>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
  );
};

export const renderDrawerToolbarLayout = (): RenderResult => {
  return render(
    <DrawerToolbarLayout
      toolbarData={DRAWER_TOOLBAR_DATA}
      displayMode="overlay"
    >
      <main>
        <div>Content for the main area</div>
      </main>
    </DrawerToolbarLayout>,
  );
};
