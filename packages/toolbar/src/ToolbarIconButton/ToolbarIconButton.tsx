import React, { ComponentPropsWithoutRef, useEffect } from 'react';
import { ChatIconButton } from '@lg-chat/chat-button';

import { useDescendant } from '@leafygreen-ui/descendants';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { spacing as spacingToken } from '@leafygreen-ui/tokens';
import {
  Align,
  Justify,
  Tooltip,
  TooltipVariant,
} from '@leafygreen-ui/tooltip';

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
      isTooltipEnabled = true,
      'aria-label': ariaLabel,
      ...rest
    }: ToolbarIconButtonProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const { index, ref } = useDescendant(
      ToolbarDescendantsContext,
      forwardedRef,
    );
    const { focusedIndex, shouldFocus, lgIds, handleOnIconButtonClick } =
      useToolbarContext();
    const isFocusable = index === focusedIndex;

    if (focusedIndex === undefined) {
      console.error(
        'ToolbarIconButton should only be used inside the Toolbar component.',
      );
    }

    if (glyph === undefined) {
      console.error(
        'A glpyh is required for ToolbarIconButton. Please provide a valid glyph. The list of available glyphs can be found in the LG Icon README, https://github.com/mongodb/leafygreen-ui/blob/main/packages/icon/README.md#properties.',
      );
    }

    useEffect(() => {
      // shouldFocus prevents this component from hijacking focus on initial page load.
      if (isFocusable && shouldFocus) ref.current?.focus();
    }, [isFocusable, ref, shouldFocus]);

    const renderTrigger = () => {
      const commonProps = {
        active,
        'aria-label': ariaLabel || getNodeTextContent(label),
        className: getIconButtonStyles({
          theme,
          active,
          disabled,
          className,
        }),
        'data-active': active,
        'data-lgid': `${lgIds.iconButton}-${index}`,
        'data-testid': `${lgIds.iconButton}-${index}`,
        disabled,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) =>
          handleOnIconButtonClick(event, index, onClick),
        ref,
        tabIndex: isFocusable ? 0 : -1,
        ...(rest as ComponentPropsWithoutRef<'button'>),
      };

      return (
        <div className={triggerStyles}>
          {glyph === 'Assistant' ? (
            <ChatIconButton {...commonProps} />
          ) : (
            <IconButton {...commonProps}>
              <Icon glyph={glyph} />
            </IconButton>
          )}
        </div>
      );
    };

    return (
      <Tooltip
        data-testid={`${lgIds.iconButtonTooltip}-${index}`}
        data-lgid={`${lgIds.iconButtonTooltip}-${index}`}
        align={Align.Left}
        justify={Justify.Middle}
        enabled={isTooltipEnabled}
        trigger={renderTrigger}
        spacing={spacingToken[100]}
        variant={TooltipVariant.Compact}
      >
        {label}
      </Tooltip>
    );
  },
);

ToolbarIconButton.displayName = 'ToolbarIconButton';
