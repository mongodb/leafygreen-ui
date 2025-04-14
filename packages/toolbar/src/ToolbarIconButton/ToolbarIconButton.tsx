import React, { useEffect, useRef } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Tooltip from '@leafygreen-ui/tooltip';

import { ToolbarDescendantsContext, useToolbarContext } from '../Context';

import { getBaseStyles, getIconButtonStyles } from './ToolbarIconButton.styles';
import { type ToolbarIconButtonProps } from './ToolbarIconButton.types';

export const ToolbarIconButton = React.forwardRef<
  HTMLLIElement,
  ToolbarIconButtonProps
>(({ label, glyph, active = false }: ToolbarIconButtonProps, forwardedRef) => {
  const { theme } = useDarkMode();
  const { index, ref } = useDescendant(ToolbarDescendantsContext, forwardedRef);
  const { focusedIndex, shouldFocus } = useToolbarContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasFocus = index === focusedIndex;

  //TODO: this hijacks the page focus
  useEffect(() => {
    if (hasFocus && shouldFocus) buttonRef.current?.focus();
  }, [index, focusedIndex, ref, hasFocus, shouldFocus]);

  return (
    <li ref={ref} className={getBaseStyles({ active })}>
      <Tooltip
        align="left"
        trigger={
          <div>
            <IconButton
              aria-label={label}
              active={active}
              className={getIconButtonStyles({ theme, active })}
              tabIndex={hasFocus ? 0 : -1}
              ref={buttonRef}
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
