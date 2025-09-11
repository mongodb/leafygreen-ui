import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { ContextMenu } from './ContextMenu';

const CHILD_TEST_ID = 'test-component';
const MENU_LABEL = 'Menu Label';

const TestComponent = (props: PropsWithChildren) => {
  return (
    <ContextMenu menuItems={[{ label: MENU_LABEL, action: jest.fn() }]}>
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

  test('hides when Escape key is pressed', () => {
    render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).toBeInTheDocument();
    userEvent.keyboard('{escape}');
    expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
  });

  test('hides when clicking outside of the menu', () => {
    const INNER_TEST_ID = 'inner-id';
    render(
      <TestComponent>
        <div data-testid={INNER_TEST_ID} />
      </TestComponent>,
    );
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(screen.queryByText(MENU_LABEL)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(INNER_TEST_ID));
    expect(screen.queryByText(MENU_LABEL)).not.toBeInTheDocument();
  });
});
