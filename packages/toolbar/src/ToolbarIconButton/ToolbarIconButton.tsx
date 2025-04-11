import React from 'react';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Tooltip from '@leafygreen-ui/tooltip';

import { getBaseStyles, getIconButtonStyles } from './ToolbarIconButton.styles';
import { type ToolbarIconButtonProps } from './ToolbarIconButton.types';

export const ToolbarIconButton = React.forwardRef<
  HTMLLIElement,
  ToolbarIconButtonProps
>(({ label, glyph, active = false }: ToolbarIconButtonProps, forwardedRef) => {
  const { theme } = useDarkMode();

  return (
    <li ref={forwardedRef} className={getBaseStyles({ active })}>
      <Tooltip
        align="left"
        trigger={
          <div>
            <IconButton
              aria-label={label}
              active={active}
              className={getIconButtonStyles({ theme, active })}
              tabIndex={-1}
            >
              <Icon glyph={glyph} />
            </IconButton>
          </div>
        }
      >
        {label}
      </Tooltip>
    </li>
  );
});

ToolbarIconButton.displayName = 'ToolbarIconButton';
