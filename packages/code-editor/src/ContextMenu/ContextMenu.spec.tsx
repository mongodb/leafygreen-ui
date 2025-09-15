import React, { PropsWithChildren } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { ContextMenu } from './ContextMenu';

const CHILD_TEST_ID = 'test-component';
const MENU_LABEL = 'Menu Label';
const MENU_LABEL_2 = 'Menu Label 2';
const actionMock = jest.fn();

const TestComponent = (props: PropsWithChildren) => {
  return (
    <ContextMenu
      menuItems={[
        { label: MENU_LABEL, action: actionMock },
        { label: MENU_LABEL_2, action: actionMock },
      ]}
    >
      <div data-testid={CHILD_TEST_ID}>Test</div>
      {props.children}
    </ContextMenu>
  );
};

describe('ContextMenu', () => {
  test('renders when inner element is right clicked', () => {
    render(<TestComponent />);
    expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).toBeInTheDocument();
  });

  test('does not render when inner element is left clicked', () => {
    render(<TestComponent />);
    expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(CHILD_TEST_ID));
    expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
  });

  test('does not render when inner element with data-no-context-menu="true" is right clicked', () => {
    const NO_CONTEXT_MENU_ID = 'no-context-menu';
    render(
      <TestComponent>
        <div data-no-context-menu="true" data-testid={NO_CONTEXT_MENU_ID} />
      </TestComponent>,
    );
    userEvent.click(screen.getByTestId(NO_CONTEXT_MENU_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
  });

  test('hides when Escape key is pressed', async () => {
    render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).toBeInTheDocument();
    userEvent.keyboard('{escape}');

    await waitFor(() => {
      expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
    });
  });

  test('hides when clicking outside of the menu', async () => {
    const INNER_TEST_ID = 'inner-id';
    render(
      <TestComponent>
        <div data-testid={INNER_TEST_ID} />
      </TestComponent>,
    );
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(INNER_TEST_ID));

    await waitFor(() => {
      expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
    });
  });

  test('calls action when menu item is clicked', () => {
    render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    userEvent.click(screen.getByText(MENU_LABEL));
    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  test('calls action with response from window.getSelection() when menu item is clicked', () => {
    const SELECTED_TEXT = 'selected text';
    Object.defineProperty(window, 'getSelection', {
      writable: true,
      value: jest.fn(() => ({
        toString: () => SELECTED_TEXT,
      })),
    });

    render(<TestComponent />);

    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    userEvent.click(screen.getByText(MENU_LABEL));
    expect(actionMock).toHaveBeenCalledWith(SELECTED_TEXT);
  });

  test('hides menu when menu item is clicked', async () => {
    render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).toBeInTheDocument();
    userEvent.click(screen.getByText(MENU_LABEL));

    await waitFor(() => {
      expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
    });
  });

  test('arrow keys select menu items correctly when menu is open', () => {
    render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });

    const menuButton1 = screen.getByText(MENU_LABEL).closest('button');
    const menuButton2 = screen.getByText(MENU_LABEL_2).closest('button');

    expect(menuButton1).not.toHaveAttribute('aria-selected', 'true');
    expect(menuButton2).not.toHaveAttribute('aria-selected', 'true');

    userEvent.keyboard('{arrowdown}');
    expect(menuButton1).toHaveAttribute('aria-selected', 'true');
    expect(menuButton2).not.toHaveAttribute('aria-selected', 'true');

    userEvent.keyboard('{arrowdown}');
    expect(menuButton1).not.toHaveAttribute('aria-selected', 'true');
    expect(menuButton2).toHaveAttribute('aria-selected', 'true');

    userEvent.keyboard('{arrowup}');
    expect(menuButton1).toHaveAttribute('aria-selected', 'true');
    expect(menuButton2).not.toHaveAttribute('aria-selected', 'true');
  });
});
