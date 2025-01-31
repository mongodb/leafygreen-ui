import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Drawer } from '../Drawer';

import { getTestUtils } from './getTestUtils';

const drawerTest = {
  content: 'Drawer content',
  title: 'Drawer title',
} as const;

const renderDrawerAsync = () =>
  renderAsyncTest(
    <Drawer title={drawerTest.title}>{drawerTest.content}</Drawer>,
    render,
  );

function renderDrawer(props = {}) {
  render(
    <Drawer title={drawerTest.title} {...props}>
      {drawerTest.content}
    </Drawer>,
  );
}

describe('packages/Drawer/getTestUtils', () => {
  describe('renders properly', () => {
    test('throws error if LG Drawer is not found', () => {
      renderDrawer();

      try {
        const _utils = getTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-Drawer"\]/,
          ),
        );
      }
    });
  });

  describe('single Drawer', () => {
    test('getDrawer', () => {
      renderDrawer();
      const { getDrawer } = getTestUtils();

      expect(getDrawer()).toBeInTheDocument();
    });

    describe('isOpen', () => {
      test('to be true when drawer is open', () => {
        renderDrawer({ open: true });
        const { isOpen } = getTestUtils();

        expect(isOpen()).toBeTruthy();
      });

      test('to be false when drawer is open', () => {
        renderDrawer({ open: false });
        const { isOpen } = getTestUtils();

        expect(isOpen()).toBeFalsy();
      });
    });
  });

  describe('async component', () => {
    test('find LG Drawer after awaiting an async component', async () => {
      const { openButton, findByTestId, asyncTestComponentId } =
        renderDrawerAsync();

      userEvent.click(openButton);

      const asyncComponent = await findByTestId(asyncTestComponentId);
      expect(asyncComponent).toBeInTheDocument();

      // After awaiting asyncComponent, look for Drawer
      const { getDrawer } = getTestUtils();
      expect(getDrawer()).toBeInTheDocument();
    });

    test('find LG Drawer after awaiting getTestUtils', async () => {
      const { openButton } = renderDrawerAsync();

      userEvent.click(openButton);

      // awaiting getTestUtils
      await waitFor(() => {
        const { getDrawer } = getTestUtils();
        expect(getDrawer()).toBeInTheDocument();
      });
    });
  });
});
