import React, { ComponentPropsWithoutRef, useEffect } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';

import { ToolbarDescendantsContext, useToolbarContext } from '../Context';

import { getIconButtonStyles, triggerStyles } from './ToolbarIconButton.styles';
import { type ToolbarIconButtonProps } from './ToolbarIconButton.types';

export const ToolbarIconButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarIconButtonProps
>(
  (
    {
      className,
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
      <Tooltip
        data-testid={lgids?.tooltip}
        data-lgid={lgids?.tooltip}
        align="left"
        trigger={
          <div className={triggerStyles}>
            <IconButton
              aria-label={getNodeTextContent(label)}
              active={active}
              className={getIconButtonStyles({
                theme,
                active,
                disabled,
                className,
              })}
              tabIndex={isFocusable ? 0 : -1}
              onClick={handleOnClick}
              disabled={disabled}
              data-testid={lgids?.iconButton}
              data-lgid={lgids?.iconButton}
              data-active={active}
              ref={ref}
              {...(rest as ComponentPropsWithoutRef<'button'>)}
            >
              <Icon glyph={glyph} />
            </IconButton>
          </div>
        }
      >
        {label}
      </Tooltip>
    );
  },
);

ToolbarIconButton.displayName = 'ToolbarIconButton';
