import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Drawer } from '../Drawer';
import { DrawerStackProvider } from '../DrawerStackContext';

import { getTestUtils } from './getTestUtils';

const drawerTest = {
  content: 'Drawer content',
  title: 'Drawer title',
} as const;

const renderDrawerAsync = () => {
  return renderAsyncTest(
    <DrawerStackProvider>
      <Drawer title={drawerTest.title} open>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
    render,
  );
};

const renderDrawer = (props = {}) => {
  render(
    <DrawerStackProvider>
      <Drawer title={drawerTest.title} {...props}>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
  );
};

const renderMultipleDrawers = () => {
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

describe('packages/drawer/getTestUtils', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  describe('single drawer', () => {
    test('findDrawer', async () => {
      const { openButton } = renderDrawerAsync();

      userEvent.click(openButton);

      const { findDrawer } = getTestUtils();
      const drawer = await findDrawer();

      expect(drawer).toBeInTheDocument();
    });

    test('getDrawer', () => {
      renderDrawer();
      const { getDrawer } = getTestUtils();

      expect(getDrawer()).toBeInTheDocument();
    });

    test('queryDrawer', () => {
      render(<div />);
      const { queryDrawer } = getTestUtils();

      expect(queryDrawer()).toBeNull();
    });

    test('isOpen', () => {
      renderDrawer({ open: true });
      const { isOpen } = getTestUtils();

      expect(isOpen()).toBeTruthy();
    });

    describe('getCloseButtonUtils', () => {
      test('getButton', () => {
        renderDrawer({ open: true, onClose: jest.fn() });
        const { getCloseButtonUtils } = getTestUtils();
        const { getButton } = getCloseButtonUtils();

        expect(getButton()).toBeInTheDocument();
      });

      test('queryButton', () => {
        renderDrawer({ open: true });
        const { getCloseButtonUtils } = getTestUtils();
        const { queryButton } = getCloseButtonUtils();

        expect(queryButton()).toBeNull();
      });
    });
  });

  describe('multiple drawer instances', () => {
    test('getDrawer', () => {
      renderMultipleDrawers();
      const utilsOne = getTestUtils('lg-drawer-1');
      const utilsTwo = getTestUtils('lg-drawer-2');

      expect(utilsOne.getDrawer()).toBeInTheDocument();
      expect(utilsTwo.getDrawer()).toBeInTheDocument();
    });

    test('isOpen', () => {
      renderMultipleDrawers();
      const utilsOne = getTestUtils('lg-drawer-1');
      const utilsTwo = getTestUtils('lg-drawer-2');
      const utilsThree = getTestUtils('lg-drawer-3');

      expect(utilsOne.isOpen()).toBeTruthy();
      expect(utilsTwo.isOpen()).toBeTruthy();
      expect(utilsThree.isOpen()).toBeFalsy();
    });
  });
});
