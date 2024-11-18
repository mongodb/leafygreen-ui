import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  alignCenterStyles,
  getContainerStyles,
  iconTransitionStyle,
  transitionDuration,
} from './BaseHeader.styles';
import { BaseHeaderProps, LabelVariants } from './BaseHeader.types';

/**
 * Generic header component that will be used by both `Chart` and `ChartCard`.
 */
export function BaseHeader({
  labelProps,
  openButtonProps,
  headerContent,
  className,
  ...rest
}: BaseHeaderProps) {
  const [isOpen, setIsOpen] = useState(openButtonProps?.isOpen || true);
  const { theme } = useDarkMode();

  return (
    <div className={cx(getContainerStyles(theme), className)} {...rest}>
      {/* Elements left of slotted component */}
      <div className={alignCenterStyles}>
        {/* Open button */}
        {openButtonProps?.show && (
          <Transition in={isOpen} timeout={transitionDuration}>
            {state => (
              <IconButton
                // Setting 'as="div"' to avoid nesting interactive components for accessibility
                as="div"
                className={iconTransitionStyle[state]}
                aria-label={`${isOpen ? 'collapse' : 'expand'} card`}
                tabIndex={0}
                onClick={e => {
                  setIsOpen(!isOpen);
                  openButtonProps.onClick?.(e);
                }}
              >
                <Icon glyph="ChevronDown" size={24} />
              </IconButton>
            )}
          </Transition>
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
}

BaseHeader.displayName = 'BaseHeader';
