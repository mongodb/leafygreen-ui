import React, { FC } from 'react';

import {
  Menu,
  MenuItem as LeafyMenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';

import { getMenuContainerStyles } from './ContextMenu.styles';
import { ContextMenuProps } from './ContextMenu.types';

/**
 * Internal component that renders the actual context menu using LeafyGreen UI components.
 * Handles menu positioning, item rendering, and click interactions.
 *
 * @internal
 */
export const ContextMenu: FC<ContextMenuProps> = ({ state, hideMenu }) => {
  if (!state.isVisible) return null;

  return (
    <div className={getMenuContainerStyles(state.position)}>
      <Menu
        open={state.isVisible}
        setOpen={() => hideMenu()}
        renderDarkMenu={false}
      >
        {state.items.map((item, index) => {
          if (item.isSeparator) {
            return <MenuSeparator key={index} />;
          }

          return (
            <LeafyMenuItem
              key={index}
              disabled={item.disabled}
              onClick={() => {
                if (item.action && !item.disabled) {
                  item.action(state.selectedText);
                }
                hideMenu();
              }}
            >
              {item.label}
            </LeafyMenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
