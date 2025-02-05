import React, { useState } from 'react';
import { flushSync } from 'react-dom';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  menuButtonTextClassName,
  popoverClassName,
} from '@leafygreen-ui/select';
import { Size } from '@leafygreen-ui/tokens';
import Tooltip, { Align, Justify, RenderMode } from '@leafygreen-ui/tooltip';

import {
  baseStyles,
  sizeStyles,
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
export const UnitSelectButton = React.forwardRef<HTMLButtonElement>(
  (
    {
      className,
      children,
      disabled,
      displayName,
      ...props
    }: UnitSelectButtonProps,
    forwardedRef,
  ) => {
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const buttonRef = useForwardedRef(forwardedRef, null);
    const { theme } = useDarkMode();

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

    const isEnabled = hasEllipsis && !disabled;

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isEnabled) {
        // Hovering over both the button and the menu popover triggers `onMouseEnter` but we only want the tooltip to show up on hover of the button. If the target has no ancestor with the popoverClassName then that means we are hovering over the button.
        const popoverParent = (e.target as HTMLButtonElement).closest(
          `.${popoverClassName}`,
        );

        if (!popoverParent) {
          // React 18 automatically batches all updates which appears to break the opening transition. flushSync prevents this state update from automically batching. Instead updates are made synchronously.
          flushSync(() => {
            setTooltipOpen(true);
          });
        }
      }
    };

    const handleMouseLeave = () => setTooltipOpen(false);
    const handleOnFocus = () => setTooltipOpen(true);
    const handleOnBlur = () => setTooltipOpen(false);

    return (
      <div className={wrapperStyles}>
        <Tooltip
          align={Align.Top}
          enabled={isEnabled}
          justify={Justify.Middle}
          // Using refEl instead of a trigger element because triggerProps by default, such as onMouseEnter, are added to the trigger element inside the tooltip component. OnMouseEnter is triggered by hovering over the trigger or any of its children. In the case of this custom menu button we don't want the tooltip to open when children are hovered so we add our own open logic with onMouseEnter.
          open={tooltipOpen}
          refEl={buttonRef}
          renderMode={RenderMode.TopLayer}
        >
          {displayName}
        </Tooltip>
        <Button
          {...props}
          as="button"
          className={cx(
            baseStyles,
            themeStyles[theme],
            sizeStyles[props.size || Size.Default],
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
