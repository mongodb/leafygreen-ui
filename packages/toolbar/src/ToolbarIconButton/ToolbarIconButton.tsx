import React, { useEffect } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';

import { ToolbarDescendantsContext, useToolbarContext } from '../Context';

import {
  baseStyles,
  getIconButtonStyles,
  triggerStyles,
} from './ToolbarIconButton.styles';
import { type ToolbarIconButtonProps } from './ToolbarIconButton.types';

// TODO: does this accept testids?
export const ToolbarIconButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarIconButtonProps
>(
  (
    {
      onClick,
      label,
      glyph,
      disabled = false,
      active = false,
      ...rest
    }: ToolbarIconButtonProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const { index, ref } = useDescendant(
      ToolbarDescendantsContext,
      forwardedRef,
    );
    const { focusedIndex, shouldFocus, setFocusedIndex, lgids } =
      useToolbarContext();
    const isFocusable = index === focusedIndex;

    if (focusedIndex === undefined) {
      console.error(
        'ToolbarIconButton should only be used inside the Toolbar component.',
      );
    }

    useEffect(() => {
      // shouldFocus prevents this component from hijacking focus on initial page load.
      if (isFocusable && shouldFocus) ref.current?.focus();
    }, [isFocusable, ref, shouldFocus]);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      // This ensures that on click, the buttons tabIndex is set to 0 so that when the up/down arrows are pressed, the correct button is focused
      setFocusedIndex?.(index);
    };

    return (
      <li className={baseStyles}>
        <Tooltip
          data-testid={lgids?.tooltip}
          data-lgid={lgids?.tooltip}
          align="left"
          trigger={
            <div className={triggerStyles}>
              <IconButton
                aria-label={getNodeTextContent(label)}
                active={active}
                className={getIconButtonStyles({ theme, active, disabled })}
                tabIndex={isFocusable ? 0 : -1}
                // FIXME:
                // @ts-ignore
                ref={ref}
                onClick={handleOnClick}
                disabled={disabled}
                data-testid={lgids?.iconButton}
                data-lgid={lgids?.iconButton}
                data-active={active}
                {...rest}
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
  },
);

ToolbarIconButton.displayName = 'ToolbarIconButton';
