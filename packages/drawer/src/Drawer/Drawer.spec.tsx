import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { getTestUtils } from '../utils';

import { Drawer, DrawerProps, LGIDs } from '.';

const drawerContent = 'Drawer content';

function renderDrawer(props: Partial<DrawerProps> = {}) {
  const utils = render(
    <Drawer title="Drawer title" {...props}>
      {drawerContent}
    </Drawer>,
  );
  const { getDrawer, ...testUtils } = getTestUtils();
  const drawer = getDrawer();
  return { ...utils, drawer, ...testUtils };
}

describe('packages/drawer', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderDrawer({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('when the "open" prop is true', () => {
    test('renders content as expected', async () => {
      const { drawer } = renderDrawer({ open: true });
      expect(drawer).toHaveAttribute('aria-hidden', 'false');
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
        const { queryByTestId } = renderDrawer({ open: true });
        expect(queryByTestId(LGIDs.closeButton)).toBeNull();
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
});
