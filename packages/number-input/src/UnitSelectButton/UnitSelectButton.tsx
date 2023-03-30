import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  menuButtonTextClassName,
  popoverClassName,
} from '@leafygreen-ui/select';
import Tooltip from '@leafygreen-ui/tooltip';

import {
  baseStyles,
  themeDisabledStyles,
  themeStyles,
  wrapperStyles,
} from './UnitSelectButton.styles';
import { UnitSelectButtonProps } from './UnitSelectButton.types';

/**
 * Custom unit button with a tooltip.
 * Tooltip will show up if there is an ellipse.
 *
 * @internal
 */
export const UnitSelectButton = React.forwardRef(
  (
    {
      className,
      children,
      disabled,
      displayName,
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
      ...props
    }: UnitSelectButtonProps,
    forwardedRef,
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const buttonRef: React.MutableRefObject<HTMLElement | null> =
      useForwardedRef(
        forwardedRef,
        null,
      ) as React.MutableRefObject<HTMLElement | null>;
    const { theme } = useDarkMode();
    const popoverProps = {
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
    } as const;

    /**
     * Gets the text node for the selected option.
     */
    const textNode = buttonRef.current?.querySelector(
      `.${menuButtonTextClassName}`,
    );

    /**
     * Checks if the selected option has an ellipse.
     */
    const hasEllipsis = textNode
      ? (textNode as HTMLElement).offsetWidth < textNode.scrollWidth
      : false;

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      // If there is no popover parent that means that we are not hovering over the popover menu. If that's the case then we should show the tooltip.
      const popoverParent = (e.target as HTMLButtonElement).closest(
        `.${popoverClassName}`,
      );
      if (!popoverParent) setOpen(true);
    };

    const handleMouseLeave = () => setOpen(false);
    const handleOnFocus = () => setOpen(true);
    const handleOnBlur = () => setOpen(false);

    return (
      <div className={wrapperStyles}>
        <Tooltip
          enabled={hasEllipsis && !disabled}
          justify="middle"
          // Using refEl instead of a trigger element because triggerProps by default, such as onMouseEnter, are added to the trigger element inside the tooltip component. OnMouseEnter is triggered by hovering over the trigger or any of its children. In the case of this custom menu button we don't want the tooltip to open when children are hovered so we add our own open logic with onMouseEnter.
          refEl={buttonRef}
          open={open}
          {...popoverProps}
        >
          {displayName}
        </Tooltip>
        <Button
          {...props}
          className={cx(
            baseStyles,
            themeStyles[theme],
            {
              [themeDisabledStyles[theme]]: disabled,
            },
            className,
          )}
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
        >
          {children}
        </Button>
      </div>
    );
  },
);

UnitSelectButton.displayName = 'UnitSelectButton';
