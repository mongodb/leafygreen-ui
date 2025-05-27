import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEFAULT_LGID_ROOT } from '../utils';

import { getTestUtils } from './getTestUtils';
import {
  renderDrawer,
  renderDrawerAsync,
  renderDrawerToolbarLayout,
  renderMultipleDrawers,
} from './render.testutils';

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

  describe('getDrawerToolbarTestUtils', () => {
    test('findToolbar', async () => {
      renderDrawerToolbarLayout();
      const { getDrawerToolbarTestUtils } = getTestUtils(DEFAULT_LGID_ROOT);
      const { findToolbar } = getDrawerToolbarTestUtils();
      const toolbar = await findToolbar();

      expect(toolbar).toBeInTheDocument();
    });

    test('getToolbar', () => {
      renderDrawerToolbarLayout();
      const { getDrawerToolbarTestUtils } = getTestUtils(DEFAULT_LGID_ROOT);
      const { getToolbar } = getDrawerToolbarTestUtils();
      const toolbar = getToolbar();

      expect(toolbar).toBeInTheDocument();
    });

    test('queryToolbar', () => {
      renderDrawerToolbarLayout();
      const { getDrawerToolbarTestUtils } = getTestUtils(DEFAULT_LGID_ROOT);
      const { queryToolbar } = getDrawerToolbarTestUtils();
      const toolbar = queryToolbar();

      expect(toolbar).toBeInTheDocument();
    });

    test('getAllToolbarIconButtons', () => {
      renderDrawerToolbarLayout();
      const { getDrawerToolbarTestUtils } = getTestUtils(DEFAULT_LGID_ROOT);
      const { getAllToolbarIconButtons } = getDrawerToolbarTestUtils();
      const buttons = getAllToolbarIconButtons();

      expect(buttons).toHaveLength(3);
    });

    test('getToolbarIconButtonByLabel', () => {
      renderDrawerToolbarLayout();
      const { getDrawerToolbarTestUtils } = getTestUtils(DEFAULT_LGID_ROOT);
      const { getToolbarIconButtonByLabel } = getDrawerToolbarTestUtils();

      expect(
        getToolbarIconButtonByLabel('Code')?.getElement(),
      ).toBeInTheDocument();
    });

    test('getActiveToolbarIconButton', () => {
      renderDrawerToolbarLayout();
      const { getDrawerToolbarTestUtils } = getTestUtils(DEFAULT_LGID_ROOT);
      const { getActiveToolbarIconButton, getToolbarIconButtonByLabel } =
        getDrawerToolbarTestUtils();

      const button = getToolbarIconButtonByLabel('Code')?.getElement();
      userEvent.click(button!);

      expect(getActiveToolbarIconButton()).toHaveAttribute(
        'data-active',
        'true',
      );
      expect(getActiveToolbarIconButton()).toHaveAttribute(
        'aria-label',
        'Code',
      );
    });
  });
});
