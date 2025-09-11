import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { getLgIds } from '../utils';

import { ContextMenu } from './ContextMenu';

const CHILD_TEST_ID = 'test-component';
const LGID = 'lg-test-lgid';
const lgIds = getLgIds(LGID);

const TestComponent = (props: PropsWithChildren) => {
  return (
    <ContextMenu
      menuItems={[{ label: 'Menu Label', action: jest.fn() }]}
      data-lgid={LGID}
    >
      <div data-testid={CHILD_TEST_ID}>Test</div>
      {props.children}
    </ContextMenu>
  );
};

function queryMenu(container: HTMLElement) {
  return container.querySelector(`[data-lgid="${lgIds.contextMenu}"]`);
}

describe('ContextMenu', () => {
  test('renders when inner element is right clicked', () => {
    const { container } = render(<TestComponent />);
    expect(queryMenu(container)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(queryMenu(container)).toBeInTheDocument();
  });

  test('does not render when inner element with data-no-context-menu="true" is right clicked', () => {
    const NO_CONTEXT_MENU_ID = 'no-context-menu';
    const { container } = render(
      <TestComponent>
        <div data-no-context-menu="true" data-testid={NO_CONTEXT_MENU_ID} />
      </TestComponent>,
    );
    userEvent.click(screen.getByTestId(NO_CONTEXT_MENU_ID), { button: 2 });
    expect(queryMenu(container)).not.toBeInTheDocument();
  });

  test('hides when Escape key is pressed', () => {
    const { container } = render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(queryMenu(container)).toBeInTheDocument();
    userEvent.keyboard('{escape}');
    expect(queryMenu(container)).not.toBeInTheDocument();
  });

  test('hides when clicking outside of the menu', () => {
    const INNER_TEST_ID = 'inner-id';
    const { container } = render(
      <TestComponent>
        <div data-testid={INNER_TEST_ID} />
      </TestComponent>,
    );
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(queryMenu(container)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(INNER_TEST_ID));
    expect(queryMenu(container)).not.toBeInTheDocument();
  });

  test('hides when clicking inside of the menu', () => {
    const { container } = render(<TestComponent />);
    userEvent.click(screen.getByTestId(CHILD_TEST_ID), { button: 2 });
    expect(queryMenu(container)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(CHILD_TEST_ID));
    expect(queryMenu(container)).not.toBeInTheDocument();
  });
});
