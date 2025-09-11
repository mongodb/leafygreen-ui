import React from 'react';

import {
  Menu,
  MenuItem as LeafyMenuItem,
  MenuSeparator,
  MenuVariant,
} from '@leafygreen-ui/menu';

import { getLgIds } from '../../utils';

import { getMenuContainerStyles } from './ContextMenuContent.styles';
import { ContextMenuContentProps } from './ContextMenuContent.types';

/**
 * Internal component that renders the actual context menu using LeafyGreen UI components.
 * Handles menu positioning, item rendering, and click interactions.
 *
 * @internal
 */
export const ContextMenuContent = ({
  state,
  hideMenu,
  'data-lgid': dataLgId,
}: ContextMenuContentProps) => {
  const lgIds = getLgIds(dataLgId);

  if (!state.isVisible) return null;

  return (
    <div
      className={getMenuContainerStyles(state.position)}
      data-lgid={lgIds.contextMenu}
    >
      <Menu
        // Force re-mount when position changes so Menu recalculates its positioning
        key={`${state.position.x}-${state.position.y}`}
        open={state.isVisible}
        setOpen={() => hideMenu()}
        renderDarkMenu={false}
        variant={MenuVariant.Compact}
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
