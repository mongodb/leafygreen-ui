import React, { ForwardedRef, forwardRef, useState } from 'react';

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
import { BaseHeaderProps, LabelVariants } from './BaseHeader.types';

/**
 * Generic header component that will be used by both `Chart` and `ChartCard`.
 */
export const BaseHeader = forwardRef(
  (
    {
      labelProps,
      collapseButtonProps,
      headerContent,
      className,
      ...rest
    }: BaseHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [collapsed, setCollapsed] = useState(
      collapseButtonProps?.collapsed || false,
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
          {collapseButtonProps?.show && (
            <IconButton
              aria-label="Collapse button"
              onClick={() => {
                setCollapsed(currentState => {
                  collapseButtonProps?.onClick?.(!currentState);
                  return !currentState;
                });
              }}
            >
              <Icon
                glyph="ChevronDown"
                className={cx(collapseIconStyles, collapsed && 'collapsed')}
              />
            </IconButton>
          )}

          {/* Label */}
          {labelProps.variant === LabelVariants.Secondary ? (
            <Body weight="regular" baseFontSize={BaseFontSize.Body1}>
              {labelProps.value}
            </Body>
          ) : (
            <Body weight="medium" baseFontSize={BaseFontSize.Body2}>
              {labelProps.value}
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
