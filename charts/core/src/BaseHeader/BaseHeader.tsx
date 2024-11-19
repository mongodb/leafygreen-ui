import React, { ForwardedRef, forwardRef, MouseEvent, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  alignCenterStyles,
  collapseIconStyles,
  getContainerStyles,
} from './BaseHeader.styles';
import { BaseHeaderProps, TitleVariant } from './BaseHeader.types';

/**
 * Generic header component that will be used by both `Chart` and `ChartCard`.
 */
export const BaseHeader = forwardRef(
  (
    {
      titleProps,
      toggleButtonProps,
      headerContent,
      className,
      ...rest
    }: BaseHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(
      toggleButtonProps?.isOpen || true,
    );
    const { theme } = useDarkMode();

    return (
      <div
        className={cx(getContainerStyles(theme), className)}
        {...rest}
        ref={ref}
      >
        {/* Elements left of slotted component */}
        <div className={alignCenterStyles}>
          {/* Collapse button */}
          {toggleButtonProps?.show && (
            <IconButton
              aria-label="Collapse button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                setIsOpen(currentState => !currentState);
                toggleButtonProps?.onClick?.(e);
              }}
            >
              <Icon
                glyph="ChevronDown"
                className={cx(collapseIconStyles, isOpen && 'open')}
              />
            </IconButton>
          )}

          {/* Label */}
          {titleProps.variant === TitleVariant.Secondary ? (
            <Body weight="regular" baseFontSize={BaseFontSize.Body1}>
              {titleProps.value}
            </Body>
          ) : (
            <Body weight="medium" baseFontSize={BaseFontSize.Body2}>
              {titleProps.value}
            </Body>
          )}
        </div>

        {/* Slotted component */}
        <div className={alignCenterStyles}>{headerContent}</div>
      </div>
    );
  },
);

BaseHeader.displayName = 'BaseHeader';
