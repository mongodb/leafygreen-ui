import React, { useCallback, useEffect, useState } from 'react';

import { getLgIds } from '../utils';

import { containerStyles } from './ContextMenu.styles';
import { ContextMenuProps } from './ContextMenu.types';
import { ContextMenuContent, type MenuState } from './ContextMenuContent';

/**
 * Context menu that adds custom right-click functionality to child elements.
 *
 * This component wires up the even listeners and handles all of the hide/show
 * logic, as well as positioning.
 *
 * Elements with `data-no-context-menu="true"` will not trigger the custom
 * context menu, allowing the default browser context menu to appear instead.
 *
 * @example
 * ```tsx
 * <ContextMenu
 *   menuItems={[
 *     {
 *       label: 'Menu Item',
 *       action: () => doTheThing()
 *     },
 *   ]}
 * >
 *   <div>
 *     Custom context menu will be shown
 *   </div>
 *   <div data-no-context-menu="true">
 *     Custom context menu won't be shown
 *   </div>
 * </ContextMenu>
 * ```
 */
export const ContextMenu = ({
  children,
  menuItems = [],
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
      setMenuState(prevMenuState => ({ ...prevMenuState, isVisible: false }));
    }
  }, [menuState.isVisible]);

  /**
   * Handle preventing default and showing and positioning custom menu onContextMenu
   */
  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      /**
       * Allow default browser context menu for elements marked as no-context-menu
       */
      if ((event.target as Element).closest('[data-no-context-menu="true"]')) {
        return;
      }

      event.preventDefault();
      const selectedText = window.getSelection()?.toString() || '';
      setMenuState({
        isVisible: true,
        position: { x: event.pageX, y: event.pageY },
        items: menuItems,
        selectedText,
      });
    },
    [menuItems],
  );

  /**
   * Handle hiding menu on Escape key press
   */
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideMenu();
      }
    },
    [hideMenu],
  );

  /**
   * Handle hiding menu on click outside of the menu
   */
  const handleClick = useCallback(
    (e: MouseEvent) => {
      /**
       * There's no menu to close if it's not visible
       */
      if (!menuState.isVisible) return;

      /**
       * Don't close if clicking inside the menu.
       * ContextMenuContent will handle closing after action call.
       */
      const target = e.target as Element;

      if (target.closest(`[data-lgid="${lgIds.contextMenu}"]`)) return;

      hideMenu();
    },
    [hideMenu, lgIds.contextMenu, menuState.isVisible],
  );

  /**
   * Set up global event listeners to close the menu when clicking outside or
   * pressing Escape.
   */
  useEffect(() => {
    if (menuState.isVisible) {
      document.addEventListener('click', handleClick, { capture: true });
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClick, handleEscape, menuState.isVisible]);

  return (
    <div onContextMenu={handleContextMenu} className={containerStyles}>
      {children}
      <ContextMenuContent
        state={menuState}
        hideMenu={hideMenu}
        data-lgid={dataLgId}
      />
    </div>
  );
};
