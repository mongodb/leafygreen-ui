import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { ContextMenuPopup } from './ContextMenuPopup';
import { MenuState } from './ContextMenuPopup.types';

describe('ContextMenuPopup', () => {
  const mockHideMenu = jest.fn();
  const mockAction1 = jest.fn();
  const mockAction2 = jest.fn();

  const createMenuState = (overrides: Partial<MenuState> = {}): MenuState => ({
    isVisible: true,
    position: { x: 100, y: 200 },
    items: [
      {
        label: 'Copy',
        action: mockAction1,
        disabled: false,
      },
      {
        label: 'Paste',
        action: mockAction2,
        disabled: false,
      },
    ],
    selectedText: 'selected text',
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('returns null when menu is not visible', () => {
      const state = createMenuState({ isVisible: false });

      const { container } = render(
        <ContextMenuPopup
          state={state}
          hideMenu={mockHideMenu}
          data-lgid="lg-test-editor"
        />,
      );

      expect(container.firstChild).toBeNull();
    });

    test('renders menu when visible', () => {
      const state = createMenuState();

      render(
        <ContextMenuPopup
          state={state}
          hideMenu={mockHideMenu}
          data-lgid="lg-test-editor"
        />,
      );

      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('Paste')).toBeInTheDocument();
    });
  });

  test('calls action with selected text when menu item is clicked', async () => {
    const state = createMenuState({
      selectedText: 'test selection',
      items: [{ label: 'Copy', action: mockAction1 }],
    });

    render(
      <ContextMenuPopup
        state={state}
        hideMenu={mockHideMenu}
        data-lgid="lg-test-editor"
      />,
    );

    const copyItem = screen.getByText('Copy');
    await userEvent.click(copyItem);

    expect(mockAction1).toHaveBeenCalledWith('test selection');
    expect(mockAction1).toHaveBeenCalledTimes(1);
  });

  test('calls hideMenu when menu item is clicked', async () => {
    const state = createMenuState({
      items: [{ label: 'Copy', action: mockAction1 }],
    });

    render(
      <ContextMenuPopup
        state={state}
        hideMenu={mockHideMenu}
        data-lgid="lg-test-editor"
      />,
    );

    const copyItem = screen.getByText('Copy');
    await userEvent.click(copyItem);

    expect(mockHideMenu).toHaveBeenCalledTimes(1);
  });

  test('does not call action when disabled item is clicked', async () => {
    const state = createMenuState({
      items: [{ label: 'Disabled', action: mockAction1, disabled: true }],
    });

    render(
      <ContextMenuPopup
        state={state}
        hideMenu={mockHideMenu}
        data-lgid="lg-test-editor"
      />,
    );

    const disabledItem = screen.getByText('Disabled');
    await userEvent.click(disabledItem);

    expect(mockAction1).not.toHaveBeenCalled();
    // Note: Disabled menu items typically don't trigger click events,
    // so hideMenu may not be called in this case
    expect(mockHideMenu).toHaveBeenCalledTimes(0);
  });
});
