import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuVariant,
} from '@leafygreen-ui/menu';

import { getLgIds } from '../utils';

import { containerStyles, getMenuContainerStyles } from './ContextMenu.styles';
import type { ContextMenuItem, ContextMenuProps } from './ContextMenu.types';

/**
 * Context menu that adds custom right-click functionality to child elements.
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
 *     Custom menu will show
 *   </div>
 *   <div data-no-context-menu="true">
 *     Custom menu won't show
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
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Handle showing and positioning custom menu onContextMenu
   */
  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      /**
       * Allow default browser context menu for elements marked as no-context-menu
       */
      if ((event.target as Element).closest('[data-no-context-menu="true"]')) {
        setIsOpen(false);
        return;
      }

      event.preventDefault();
      const selectedText = window.getSelection()?.toString() || '';
      setIsOpen(true);
      setPosition({ x: event.pageX, y: event.pageY });
      setSelectedText(selectedText);
    },
    [],
  );
  /**
   * Close context menu when right-clicking outside of children
   */
  const handleGlobalContextMenu = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  /**
   * Handle hiding menu on click outside of the menu.
   *
   * This is typically handled inside of the Menu component. However, on close
   * the Menu component tries to focus on the next focusable element. This is
   * not desirable for a context menu. Instead we just hide the entire thing
   * before the refocus occurs by setting the open state to false and only
   * rendering the Menu when the open state is true.
   */
  const handleClick = useCallback(
    (e: MouseEvent) => {
      /**
       * Don't close if clicking inside the menu.
       * This is handled in the MenuItem onClick handler.
       */
      const target = e.target as Element;
      if (target.closest(`[data-lgid="${lgIds.contextMenu}"]`)) return;

      setIsOpen(false);
    },
    [lgIds.contextMenu],
  );

  /**
   * Handles the click event for a menu item.
   * Closes the context menu and calls the action function for the selected item.
   */
  const handledClickItem = useCallback(
    (item: ContextMenuItem) => {
      if (item.action && !item.disabled) {
        item.action(selectedText);
      }
      setIsOpen(false);
    },
    [selectedText],
  );

  /**
   * Manages global event listeners while context menu is open.
   * Closes menu on right-click or click outside the menu area.
   */
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('contextmenu', handleGlobalContextMenu);
      /**
       * Must capture click to prevent default Menu handling of clicks.
       * See {@link handleClick} comment for more details.
       */
      document.addEventListener('click', handleClick, { capture: true });
      return () => {
        document.removeEventListener('contextmenu', handleGlobalContextMenu);
        document.addEventListener('click', handleClick, { capture: false });
      };
    }
  }, [isOpen, handleGlobalContextMenu, handleClick]);

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className={containerStyles}
    >
      {children}

      {isOpen && (
        <div className={getMenuContainerStyles(position)}>
          <Menu
            /** Force re-mount when position changes so Menu recalculates its positioning */
            key={`${position.x}-${position.y}`}
            open={isOpen}
            setOpen={setIsOpen}
            renderDarkMenu={false}
            variant={MenuVariant.Compact}
            data-lgid={lgIds.contextMenu}
            data-testid={lgIds.contextMenu}
          >
            {menuItems.map((item, index) => {
              if (item.isSeparator) {
                return <MenuSeparator key={index} />;
              }

              return (
                <MenuItem
                  key={index}
                  disabled={item.disabled}
                  onClick={() => handledClickItem(item)}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      )}
    </div>
  );
};
