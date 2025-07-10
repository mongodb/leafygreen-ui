import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import {
  getTestUtils,
  renderContextDrawer,
  TestContextDrawer,
} from '../testing';

describe('packages/context-drawer', () => {
  describe('a11y', () => {
    test('closed drawer does not have basic accessibility issues', async () => {
      const { container } = renderContextDrawer({ isOpen: false });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('open drawer does not have basic accessibility issues', async () => {
      const { container } = renderContextDrawer({ isOpen: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders its slot components', () => {
    renderContextDrawer({ isOpen: true });
    const { getToggleButtonUtils } = getTestUtils();
    expect(screen.getByText('Reference')).toBeVisible();
    expect(screen.getByText('Drawer content')).toBeVisible();
    expect(getToggleButtonUtils().getButton()).toBeVisible();
  });

  test('renders a trigger function', () => {
    const triggerFn = jest.fn(({ isOpen }) => (
      <button>Trigger is {isOpen ? 'open' : 'closed'}</button>
    ));
    renderContextDrawer({ trigger: triggerFn });
    const { getToggleButtonUtils } = getTestUtils();
    const toggleButton = getToggleButtonUtils().getButton();

    expect(triggerFn).toHaveBeenCalledWith({ isOpen: false });
    expect(toggleButton).toBeVisible();
    expect(toggleButton).toHaveTextContent('Trigger is closed');

    userEvent.click(toggleButton);

    expect(triggerFn).toHaveBeenCalledWith({ isOpen: true });
    expect(toggleButton).toBeVisible();
    expect(toggleButton).toHaveTextContent('Trigger is open');
  });

  test('renders closed by default', () => {
    renderContextDrawer();
    const { isOpen } = getTestUtils();
    expect(isOpen()).toBeFalsy();
  });

  test('opens when trigger is clicked', () => {
    renderContextDrawer();
    const { getToggleButtonUtils, isOpen } = getTestUtils();
    const toggleButton = getToggleButtonUtils().getButton();

    expect(isOpen()).toBeFalsy();

    userEvent.click(toggleButton);

    expect(isOpen()).toBeTruthy();
  });

  test('calls onOpenChange when trigger is clicked', () => {
    const onOpenChange = jest.fn();
    renderContextDrawer({ onOpenChange });
    const { getToggleButtonUtils } = getTestUtils();

    const toggleButton = getToggleButtonUtils().getButton();

    userEvent.click(toggleButton);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  // JSDOM doesn't support hiding focusable elements when visibility is hidden
  // this test is used as a stopgap until the below skipped test can be used
  test('drawer is hidden when closed', () => {
    renderContextDrawer({
      content: (
        <>
          <div>Drawer content</div>
          <button>Focusable</button>
        </>
      ),
    });
    const { isOpen } = getTestUtils();
    expect(isOpen()).toBeFalsy();
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('focuses the trigger button first when closed', () => {
    renderContextDrawer({
      content: (
        <>
          <div>Drawer content</div>
          <button>Focusable</button>
        </>
      ),
    });
    const { getToggleButtonUtils } = getTestUtils();
    const toggleButton = getToggleButtonUtils().getButton();

    userEvent.tab();

    const focusableButton = screen.queryByRole('button', {
      name: 'Focusable',
    });
    expect(toggleButton).toHaveFocus();
    expect(focusableButton).not.toBeVisible();
    expect(focusableButton).not.toHaveFocus();
  });

  test('first focusable element receives focus when opened and tabbing moves focus through drawer and back to the trigger', async () => {
    renderContextDrawer({
      content: (
        <>
          <div>Drawer content</div>
          <button>Focusable</button>
        </>
      ),
    });
    const { getToggleButtonUtils } = getTestUtils();
    const toggleButton = getToggleButtonUtils().getButton();

    userEvent.click(toggleButton);

    const focusableButton = await screen.findByRole('button', {
      name: 'Focusable',
    });
    await waitFor(() => expect(focusableButton).toHaveFocus());

    userEvent.tab();
    expect(toggleButton).toHaveFocus();
  });

  test('opens and closes when trigger is clicked', async () => {
    renderContextDrawer();
    const { getToggleButtonUtils, isOpen } = getTestUtils();
    const toggleButton = getToggleButtonUtils().getButton();

    expect(isOpen()).toBeFalsy();

    userEvent.click(toggleButton);
    expect(isOpen()).toBeTruthy();

    userEvent.click(toggleButton);
    expect(isOpen()).toBeFalsy();
  });

  test('is open by default when `defaultOpen` is true', () => {
    renderContextDrawer({ defaultOpen: true });
    const { isOpen } = getTestUtils();
    expect(isOpen()).toBeTruthy();
  });

  describe('controlled mode', () => {
    test('`isOpen` and `onOpenChange` props control the state', () => {
      const onOpenChange = jest.fn();
      const { rerender } = renderContextDrawer({
        isOpen: false,
        onOpenChange,
      });
      const { getToggleButtonUtils, isOpen } = getTestUtils();
      const toggleButton = getToggleButtonUtils().getButton();

      expect(isOpen()).toBeFalsy();

      userEvent.click(toggleButton);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(isOpen()).toBeFalsy(); // should not change state since isOpen is controlled

      rerender(<TestContextDrawer isOpen={true} onOpenChange={onOpenChange} />);
      expect(isOpen()).toBeTruthy();

      userEvent.click(toggleButton);
      expect(onOpenChange).toHaveBeenCalledTimes(2);
      expect(isOpen()).toBeTruthy(); // should not change state since isOpen is controlled
    });
  });

  describe('aria attributes', () => {
    test('are set correctly', () => {
      renderContextDrawer();
      const { getContextDrawer, getToggleButtonUtils } = getTestUtils();
      const contextDrawer = getContextDrawer();
      const toggleButton = getToggleButtonUtils().getButton();

      expect(contextDrawer).toHaveAttribute('aria-hidden', 'true');
      expect(contextDrawer).toHaveAttribute('aria-labelledby', toggleButton.id);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton).toHaveAttribute('aria-controls', contextDrawer.id);

      userEvent.click(toggleButton);

      expect(contextDrawer).toHaveAttribute('aria-hidden', 'false');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
