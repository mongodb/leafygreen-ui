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
      moreInfoButtonProps,
      closeButtonProps,
      fullScreenButtonProps,
      resetButtonProps,
      collapseButtonProps,
      inputContent,
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

          {/* More info button */}
          {moreInfoButtonProps?.show && (
            <IconButton
              aria-label="More info button"
              onClick={moreInfoButtonProps?.onClick}
            >
              <Icon glyph="QuestionMarkWithCircle" />
            </IconButton>
          )}
        </div>

        {/* Slotted component */}
        <div className={alignCenterStyles}>{inputContent}</div>

        {/* Elements right of slotted component */}
        <div className={alignCenterStyles}>
          {/* Reset button */}
          {resetButtonProps?.show && (
            // TODO: LG-4664 - Swap with actual icon
            <IconButton
              aria-label="Reset button"
              onClick={resetButtonProps?.onClick}
            >
              <Icon glyph="Refresh" />
            </IconButton>
          )}

          {/* Fullscreen button */}
          {fullScreenButtonProps?.show && (
            <IconButton
              aria-label="Fullscreen button"
              onClick={fullScreenButtonProps?.onClick}
            >
              <Icon glyph="FullScreenEnter" />
            </IconButton>
          )}

          {/* Close button */}
          {closeButtonProps?.show && (
            <IconButton
              aria-label="Close button"
              onClick={closeButtonProps?.onClick}
            >
              <Icon glyph="X" />
            </IconButton>
          )}
        </div>
      </div>
    );
  },
);

BaseHeader.displayName = 'BaseHeader';
