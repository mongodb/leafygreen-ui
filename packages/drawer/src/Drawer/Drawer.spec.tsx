import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { DrawerLayout } from '../DrawerLayout';
import { DrawerStackProvider } from '../DrawerStackContext';
import { getTestUtils } from '../testing';

import { DisplayMode, Drawer, DrawerProps } from '.';

const drawerTest = {
  content: 'Drawer content',
  title: 'Drawer title',
} as const;

const DrawerWithButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <DrawerLayout
      isDrawerOpen={isOpen}
      onClose={() => setIsOpen(false)}
      displayMode={DisplayMode.Embedded}
    >
      <button data-testid="open-drawer-button" onClick={handleOpen}>
        Open Drawer
      </button>
      <Drawer title={drawerTest.title}>{drawerTest.content}</Drawer>
    </DrawerLayout>
  );
};

function renderDrawer(props: Partial<DrawerProps> = {}) {
  const utils = render(
    <DrawerStackProvider>
      <Drawer title={drawerTest.title} {...props}>
        {drawerTest.content}
      </Drawer>
    </DrawerStackProvider>,
  );
  const { getDrawer, ...testUtils } = getTestUtils();
  const drawer = getDrawer();
  return { ...utils, drawer, ...testUtils };
}

describe('packages/drawer', () => {
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

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderDrawer({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('focus is on the first focusable element when the drawer is opened by pressing the enter key on the open button', async () => {
      const { getByTestId } = render(<DrawerWithButton />);
      const { isOpen, getCloseButtonUtils } = getTestUtils();

      expect(isOpen()).toBe(false);
      const openDrawerButton = getByTestId('open-drawer-button');
      openDrawerButton.focus();
      userEvent.keyboard('{enter}');

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        const closeButton = getCloseButtonUtils().getButton();
        expect(closeButton).toHaveFocus();
      });
    });

    test('focus returns to the open button when the drawer is closed', async () => {
      const { getByTestId } = render(<DrawerWithButton />);
      const { isOpen, getCloseButtonUtils } = getTestUtils();

      expect(isOpen()).toBe(false);
      const openDrawerButton = getByTestId('open-drawer-button');
      openDrawerButton.focus();
      userEvent.keyboard('{enter}');

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        const closeButton = getCloseButtonUtils().getButton();
        expect(closeButton).toHaveFocus();
      });

      userEvent.keyboard('{enter}');

      await waitFor(() => {
        expect(isOpen()).toBe(false);
        expect(openDrawerButton).toHaveFocus();
      });
    });
  });

  describe('displayMode prop', () => {
    test('renders as dialog when "displayMode" is "overlay"', () => {
      const { drawer } = renderDrawer({
        open: true,
        displayMode: DisplayMode.Overlay,
      });
      expect(drawer.tagName).toBe('DIALOG');
    });

    test('renders as div when "displayMode" is "embedded"', () => {
      const { drawer } = renderDrawer({
        open: true,
        displayMode: DisplayMode.Embedded,
      });
      expect(drawer.tagName).toBe('DIV');
    });
  });

  describe('when the "open" prop is true', () => {
    test('renders content as expected', async () => {
      const { getByText, isOpen } = renderDrawer({ open: true });
      expect(isOpen()).toBeTruthy();
      expect(getByText(drawerTest.content)).toBeVisible();
      expect(getByText(drawerTest.title)).toBeVisible();
    });

    test('uses "id" prop when set', () => {
      const { drawer } = renderDrawer({ open: true, id: 'test-id' });
      expect(drawer).toHaveAttribute('id', 'test-id');
    });

    describe('onClose', () => {
      test('close button is rendered when onClose is provided', () => {
        const { getCloseButtonUtils } = renderDrawer({
          open: true,
          onClose: jest.fn(),
        });
        const { getButton: getCloseButton } = getCloseButtonUtils();

        expect(getCloseButton()).toBeInTheDocument();
      });

      test('close button is not rendered when onClose is not provided', () => {
        const { getCloseButtonUtils } = renderDrawer({ open: true });
        const { queryButton: queryCloseButton } = getCloseButtonUtils();

        expect(queryCloseButton()).toBeNull();
      });

      test('calls onClose when close button is clicked', () => {
        const mockOnClose = jest.fn();
        const { getCloseButtonUtils } = renderDrawer({
          open: true,
          onClose: mockOnClose,
        });
        const { getButton: getCloseButton } = getCloseButtonUtils();
        const closeButton = getCloseButton();

        expect(closeButton).toBeInTheDocument();

        userEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  test('when the "open" prop is false, does not render content', () => {
    const { isOpen } = renderDrawer();
    expect(isOpen()).toBeFalsy();
  });
});
