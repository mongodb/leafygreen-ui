import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ContextDrawer, ContextDrawerProps } from '.';

const MockContextDrawer = (props: Partial<ContextDrawerProps> = {}) => {
  return (
    <ContextDrawer
      reference={<div>Reference content</div>}
      content={<div>Drawer content</div>}
      trigger={<button>Trigger</button>}
      {...props}
    />
  );
};

const renderContextDrawer = (props: Partial<ContextDrawerProps> = {}) => {
  return render(<MockContextDrawer {...props} />);
};

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

  test('renders its children', () => {
    renderContextDrawer();
    expect(screen.getByText('Reference content')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  test('renders a trigger function', () => {
    const triggerFn = jest.fn(({ isOpen }) => (
      <button>Trigger is {isOpen ? 'open' : 'closed'}</button>
    ));
    renderContextDrawer({ trigger: triggerFn });

    expect(triggerFn).toHaveBeenCalledWith({ isOpen: false });
    expect(screen.getByText('Trigger is closed')).toBeInTheDocument();

    const trigger = screen.getByRole('button');
    userEvent.click(trigger);

    expect(triggerFn).toHaveBeenCalledWith({ isOpen: true });
    expect(screen.getByText('Trigger is open')).toBeInTheDocument();
  });

  test('renders closed by default', () => {
    renderContextDrawer({
      reference: <div>Reference content</div>,
      content: <div>Drawer content</div>,
      trigger: <button>Trigger</button>,
    });

    const content = screen.queryByRole('region');
    expect(content).toBeNull();
  });

  test('opens when trigger is clicked', () => {
    renderContextDrawer({
      reference: <div>Reference content</div>,
      content: <div>Drawer content</div>,
      trigger: <button>Trigger</button>,
    });

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    userEvent.click(triggerButton);

    const content = screen.getByRole('region');
    expect(content).toBeVisible();
  });

  test('calls onOpenChange when trigger is clicked', () => {
    const onOpenChange = jest.fn();
    renderContextDrawer({
      reference: <div>Reference content</div>,
      content: <div>Drawer content</div>,
      trigger: <button>Trigger</button>,
      onOpenChange,
    });

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    userEvent.click(triggerButton);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  // JSDOM doesn't support hiding focusable elements when visibility is hidden
  // this test is used as a stopgap until the below skipped test can be used
  test('drawer is hidden when closed', () => {
    renderContextDrawer({
      reference: <div>Reference content</div>,
      content: (
        <>
          <div>Drawer content</div>
          <button>Focusable</button>
        </>
      ),
      trigger: <button>Trigger</button>,
    });
    const drawer = screen.queryByRole('region');
    expect(drawer).toBeNull();
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('focuses the trigger button first when closed', () => {
    renderContextDrawer({
      reference: <div>Reference content</div>,
      content: (
        <>
          <div>Drawer content</div>
          <button>Focusable</button>
        </>
      ),
      trigger: <button>Trigger</button>,
    });

    userEvent.tab();

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    const focusableButton = screen.getByRole('button', {
      name: 'Focusable',
    });
    expect(triggerButton).toHaveFocus();
    expect(focusableButton).not.toHaveFocus();
  });

  test('first focusable element receives focus when opened', async () => {
    renderContextDrawer({
      reference: <div>Reference content</div>,
      content: (
        <>
          <div>Drawer content</div>
          <button>Focusable</button>
        </>
      ),
      trigger: <button>Trigger</button>,
    });

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });

    userEvent.click(triggerButton);

    const focusableButton = await screen.findByRole('button', {
      name: 'Focusable',
    });
    waitFor(() => expect(focusableButton).toHaveFocus());
  });

  test('opens and closes when trigger is clicked', async () => {
    renderContextDrawer();
    const trigger = screen.getByText('Trigger');
    let content = screen.queryByRole('region');

    expect(content).toBeNull();

    userEvent.click(trigger);
    content = screen.getByRole('region');
    expect(content).toBeVisible();

    userEvent.click(trigger);
    await waitFor(() => {
      expect(content).not.toBeVisible();
    });
  });

  test('is open by default when `defaultOpen` is true', () => {
    renderContextDrawer({ defaultOpen: true });
    const content = screen.getByRole('region');
    expect(content).toBeVisible();
  });

  describe('controlled mode', () => {
    test('`isOpen` and `onOpenChange` props control the state', () => {
      const onOpenChange = jest.fn();
      const { rerender } = renderContextDrawer({
        isOpen: false,
        onOpenChange,
      });
      const trigger = screen.getByText('Trigger');
      let content = screen.queryByRole('region');

      expect(content).toBeNull();

      userEvent.click(trigger);
      content = screen.queryByRole('region');
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(content).toBeNull();

      rerender(<MockContextDrawer isOpen={true} onOpenChange={onOpenChange} />);
      content = screen.getByRole('region');
      expect(content).toBeVisible();

      userEvent.click(trigger);
      content = screen.queryByRole('region');
      expect(onOpenChange).toHaveBeenCalledTimes(2);
      expect(content).toBeVisible();
    });
  });

  describe('aria attributes', () => {
    test('are set correctly', () => {
      renderContextDrawer();
      const trigger = screen.getByText('Trigger');
      const contentWrapper = screen.getByRole('region', { hidden: true });

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-controls', contentWrapper.id);

      userEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
