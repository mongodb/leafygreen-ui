import React, { useEffect } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';

import { ToolbarDescendantsContext, useToolbarContext } from '../Context';

import { getBaseStyles, getIconButtonStyles } from './ToolbarIconButton.styles';
import { type ToolbarIconButtonProps } from './ToolbarIconButton.types';

export const ToolbarIconButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarIconButtonProps
>(
  (
    { onClick, label, glyph, active = false, ...rest }: ToolbarIconButtonProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const { index, ref } = useDescendant(
      ToolbarDescendantsContext,
      forwardedRef,
    );
    const { focusedIndex, shouldFocus, setFocusedIndex } = useToolbarContext();
    const isFocusable = index === focusedIndex;

    useEffect(() => {
      // shouldFocus prevents this component from hijacking focus on initial page load.
      if (isFocusable && shouldFocus) ref.current?.focus();
    }, [isFocusable, ref, shouldFocus]);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      // This ensures that pressing up/down arrows will focus the correct button
      setFocusedIndex?.(index);
    };

    return (
      <li className={getBaseStyles({ active })}>
        <Tooltip
          align="left"
          trigger={
            <div>
              <IconButton
                aria-label={getNodeTextContent(label)}
                active={active}
                className={getIconButtonStyles({ theme, active })}
                tabIndex={isFocusable ? 0 : -1}
                // TODO: fix me
                // @ts-ignore
                ref={ref}
                onClick={handleOnClick}
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
