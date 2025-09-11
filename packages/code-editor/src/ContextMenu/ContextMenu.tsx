import React, { useCallback, useEffect, useState } from 'react';

import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuVariant,
} from '@leafygreen-ui/menu';

import { getLgIds } from '../utils';

import { containerStyles, getMenuContainerStyles } from './ContextMenu.styles';
import type { ContextMenuProps } from './ContextMenu.types';

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
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');

  /**
   * Hides the context menu if it's currently visible.
   */
  const hideMenu = useCallback(() => {
    setIsVisible(false);
  }, []);

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
      setIsVisible(true);
      setPosition({ x: event.pageX, y: event.pageY });
      setSelectedText(selectedText);
    },
    [],
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
      /** There's no menu to close if it's not visible */
      if (!isVisible) return;

      /**
       * Don't close if clicking inside the menu.
       * ContextMenuView will handle closing after action call.
       */
      const target = e.target as Element;

      if (target.closest(`[data-lgid="${lgIds.contextMenu}"]`)) return;

      hideMenu();
    },
    [hideMenu, lgIds.contextMenu, isVisible],
  );

  /**
   * Set up global event listeners to close the menu when clicking outside or
   * pressing Escape.
   */
  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleClick, { capture: true });
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClick, handleEscape, isVisible]);

  return (
    <div onContextMenu={handleContextMenu} className={containerStyles}>
      {children}

      {isVisible && (
        <div
          className={getMenuContainerStyles(position)}
          data-lgid={lgIds.contextMenu}
        >
          <Menu
            // Force re-mount when position changes so Menu recalculates its positioning
            key={`${position.x}-${position.y}`}
            open={true}
            setOpen={() => hideMenu()}
            renderDarkMenu={false}
            variant={MenuVariant.Compact}
          >
            {menuItems.map((item, index) => {
              if (item.isSeparator) {
                return <MenuSeparator key={index} />;
              }

              return (
                <MenuItem
                  key={index}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.action && !item.disabled) {
                      item.action(selectedText);
                    }
                    hideMenu();
                  }}
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
