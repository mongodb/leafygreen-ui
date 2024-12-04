import React, { forwardRef, MouseEvent, useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  childrenContainerStyles,
  getContainerStyles,
  headerStyles,
  leftInnerContainerStyles,
  openContainerStyles,
  openToggleIconStyles,
  toggleButtonStyles,
  toggleIconStyles,
} from './ChartCard.styles';
import { ChartCardProps } from './ChartCard.types';

/**
 * Card component that contains charts and can expand and collapse.
 */
export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(
  (
    {
      children,
      className,
      title,
      headerContent,
      defaultOpen = true,
      isOpen: isControlledOpen,
      onToggleButtonClick,
      ...rest
    },
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const isControlled = isControlledOpen !== undefined;

    const [isOpen, setIsOpen] = useState(isControlledOpen ?? defaultOpen);

    const toggleId = useIdAllocator({ prefix: 'expandable-chart-card-toggle' });
    const childrenId = useIdAllocator({
      prefix: 'expandable-chart-card-content',
    });

    // When the controlled prop changes, update the internal state
    useEffect(() => {
      if (isControlled) {
        setIsOpen(isControlledOpen ?? defaultOpen);
      }
    }, [defaultOpen, isControlled, isControlledOpen]);

    function handleToggleButtonClick(e: MouseEvent<HTMLButtonElement>) {
      if (!isControlled) {
        setIsOpen(currState => !currState);
      }
      onToggleButtonClick?.(e);
    }

    return (
      <div
        className={cx(getContainerStyles(theme), className, {
          [openContainerStyles]: isOpen,
        })}
        ref={forwardedRef}
        {...rest}
      >
        <div className={cx(headerStyles, className)} {...rest}>
          <div className={leftInnerContainerStyles}>
            <IconButton
              className={toggleButtonStyles}
              id={toggleId}
              aria-label="Toggle button"
              aria-controls={childrenId}
              aria-expanded={isOpen}
              onClick={handleToggleButtonClick}
            >
              <Icon
                glyph="ChevronDown"
                className={cx(toggleIconStyles, {
                  [openToggleIconStyles]: isOpen,
                })}
              />
            </IconButton>
            <Body weight="medium" baseFontSize={BaseFontSize.Body2}>
              {title}
            </Body>
          </div>
          <div>{headerContent}</div>
        </div>
        <div className={childrenContainerStyles}>
          <div
            role="region"
            id={childrenId}
            aria-labelledby={toggleId}
            aria-hidden={!isOpen}
            data-testid="lg-charts-core-chart_card-children"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

ChartCard.displayName = 'ChartCard';
