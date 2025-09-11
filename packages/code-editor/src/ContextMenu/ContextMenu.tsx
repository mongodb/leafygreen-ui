import React, { useCallback, useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('contextmenu', handleGlobalContextMenu);
      return () => {
        document.removeEventListener('contextmenu', handleGlobalContextMenu);
      };
    }
  }, [isOpen, handleGlobalContextMenu]);

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className={containerStyles}
    >
      {children}

      <div className={getMenuContainerStyles(position)}>
        <Menu
          // Force re-mount when position changes so Menu recalculates its positioning
          key={`${position.x}-${position.y}`}
          open={isOpen}
          setOpen={setIsOpen}
          renderDarkMenu={false}
          variant={MenuVariant.Compact}
          data-lgid={lgIds.contextMenu}
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
                  setIsOpen(false);
                }}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};
