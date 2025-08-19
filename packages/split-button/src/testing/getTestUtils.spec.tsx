import React from 'react';
import { render } from '@testing-library/react';

import { MenuItem } from '@leafygreen-ui/menu';

import { SplitButton } from '../SplitButton';

import { getTestUtils } from './getTestUtils';

const menuItems = [
  <MenuItem key="0">Menu Item 1</MenuItem>,
  <MenuItem key="1">Menu Item 2</MenuItem>,
  <MenuItem key="2" disabled>
    Disabled Menu Item
  </MenuItem>,
];

const defaultProps = {
  label: 'Test SplitButton',
  menuItems,
};

describe('packages/split-button/testing/getTestUtils', () => {
  describe('getTestUtils', () => {
    test('returns all expected utility functions', () => {
      render(<SplitButton {...defaultProps} />);
      const utils = getTestUtils();

      // Check all utility functions exist
      expect(utils.findRoot).toBeDefined();
      expect(utils.getRoot).toBeDefined();
      expect(utils.queryRoot).toBeDefined();

      expect(utils.findButton).toBeDefined();
      expect(utils.getButton).toBeDefined();
      expect(utils.queryButton).toBeDefined();

      expect(utils.findTrigger).toBeDefined();
      expect(utils.getTrigger).toBeDefined();
      expect(utils.queryTrigger).toBeDefined();

      expect(utils.findMenu).toBeDefined();
      expect(utils.getMenu).toBeDefined();
      expect(utils.queryMenu).toBeDefined();

      expect(utils.findMenuItems).toBeDefined();
      expect(utils.getMenuItems).toBeDefined();
      expect(utils.queryMenuItems).toBeDefined();

      expect(utils.isDisabled).toBeDefined();
      expect(utils.openMenu).toBeDefined();
      expect(utils.closeMenu).toBeDefined();
    });

    test('gets root element correctly', () => {
      render(<SplitButton {...defaultProps} />);
      const { getRoot } = getTestUtils();

      const root = getRoot();
      expect(root).toBeInTheDocument();
      expect(root.getAttribute('data-lgid')).toBe('lg-split_button');
    });

    test('gets button element correctly', () => {
      render(<SplitButton {...defaultProps} />);
      const { getButton } = getTestUtils();

      const button = getButton();
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('Test SplitButton');
    });

    test('gets trigger element correctly', () => {
      render(<SplitButton {...defaultProps} />);
      const { getTrigger } = getTestUtils();

      const trigger = getTrigger();
      expect(trigger).toBeInTheDocument();
      expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    });

    test('detects disabled state correctly', () => {
      const { rerender } = render(<SplitButton {...defaultProps} />);
      const { isDisabled } = getTestUtils();

      // Initially not disabled
      expect(isDisabled()).toBe(false);

      // Rerender with disabled prop
      rerender(<SplitButton {...defaultProps} disabled />);
      expect(isDisabled()).toBe(true);
    });

    test('opens menu correctly', async () => {
      render(<SplitButton {...defaultProps} />);
      const { openMenu, findMenu } = getTestUtils();

      // Menu should not be visible initially
      expect(
        document.querySelector('[data-lgid="lg-split_button-menu"]'),
      ).not.toBeInTheDocument();

      // Open menu
      await openMenu();

      // Menu should now be visible
      const menu = await findMenu();
      expect(menu).toBeInTheDocument();
    });

    test('works with custom lgId', () => {
      render(
        <SplitButton {...defaultProps} data-lgid="lg-custom-split-button" />,
      );
      const { getRoot } = getTestUtils('lg-custom-split-button');

      const root = getRoot();
      expect(root).toBeInTheDocument();
      expect(root.getAttribute('data-lgid')).toBe('lg-custom-split-button');
    });
  });
});
