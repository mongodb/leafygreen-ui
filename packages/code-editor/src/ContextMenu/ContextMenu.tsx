import React, { useCallback, useEffect, useState } from 'react';

import { ContextMenuPopup, type MenuState } from '../ContextMenuPopup';
import { getLgIds } from '../utils';

import { containerStyles } from './ContextMenu.styles';
import { ContextMenuProps } from './ContextMenu.types';

/**
 * A simple context menu that adds custom right-click functionality to all child elements.
 *
 * Automatically detects selected text using `window.getSelection()` and passes it to menu item actions.
 * No complex setup required - just wrap your content and provide menu items.
 *
 * Elements with `data-no-context-menu="true"` will not trigger the custom context menu,
 * allowing the default browser context menu to appear instead.
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   menuItems={[
 *     {
 *       label: 'Copy',
 *       action: (selectedText) => navigator.clipboard.writeText(selectedText)
 *     },
 *     { isSeparator: true },
 *     {
 *       label: 'Delete',
 *       action: () => deleteContent(),
 *       disabled: !canDelete
 *     }
 *   ]}
 * >
 *   <div>Your content here</div>
 *   <div data-no-context-menu="true">
 *     This toolbar won't show custom context menu
 *   </div>
 * </ContextMenu>
 * ```
 */
export const ContextMenu = ({
  children,
  menuItems = [],
  preventDefaultContextMenu = true,
  disabled = false,
  'data-lgid': dataLgId,
}: ContextMenuProps) => {
  const lgIds = getLgIds(dataLgId);
  const [menuState, setMenuState] = useState<MenuState>({
    isVisible: false,
    position: { x: 0, y: 0 },
    items: [],
    selectedText: '',
  });

  /**
   * Hides the context menu if it's currently visible.
   */
  const hideMenu = useCallback(() => {
    if (menuState.isVisible) {
      setMenuState(s => ({ ...s, isVisible: false }));
    }
  }, [menuState.isVisible]);

  /**
   * Handles right-click events to show the context menu.
   * Automatically captures selected text and positions the menu at cursor location.
   */
  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || menuItems.length === 0) return;

      // Check if the target or any parent has the no-context-menu attribute
      const target = event.target as Element;

      if (target.closest('[data-no-context-menu="true"]')) {
        // Allow default browser context menu for elements marked as no-context-menu
        return;
      }

      if (preventDefaultContextMenu) {
        event.preventDefault();
      }

      // Get selected text automatically using window.getSelection()
      const selectedText = window.getSelection()?.toString() || '';

      setMenuState({
        isVisible: true,
        position: { x: event.pageX, y: event.pageY },
        items: menuItems,
        selectedText,
      });
    },
    [disabled, preventDefaultContextMenu, menuItems],
  );

  /**
   * Set up global event listeners to close the menu when clicking outside or pressing Escape.
   * Automatically cleans up listeners when component unmounts.
   */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only handle if menu is visible
      if (!menuState.isVisible) return;

      // Don't close if clicking inside the menu
      const target = e.target as Element;

      // Check for our context menu popup LGID first
      if (target.closest(`[data-lgid="${lgIds.contextMenuPopup}"]`)) return;

      // Fallback: check for LeafyGreen menu attributes
      if (target.closest('[data-lgid^="menu"]')) return;

      // Hide menu without interfering with the click event
      hideMenu();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideMenu();
      }
    };

    // Only add listeners when menu is visible
    if (menuState.isVisible) {
      document.addEventListener('click', handleClick, { capture: true });
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      document.removeEventListener('keydown', handleEscape);
    };
  }, [hideMenu, menuState.isVisible, lgIds.contextMenuPopup]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={containerStyles}
      data-lgid={lgIds.contextMenu}
    >
      {children}
      <ContextMenuPopup
        state={menuState}
        hideMenu={hideMenu}
        data-lgid={dataLgId}
      />
    </div>
  );
};
