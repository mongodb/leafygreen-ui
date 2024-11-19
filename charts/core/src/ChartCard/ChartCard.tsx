import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  getContainerStyles,
  getHeaderStyles,
  leftInnerContainerStyles,
  toggleButtonStyles,
  toggleIconStyles,
} from './ChartCard.styles';
import { ChartCardProps } from './ChartCard.types';

/**
 * Card component that contains charts and can expand and collapse.
 */
export function ChartCard({
  children,
  className,
  title,
  headerContent,
  defaultOpen = true,
  isOpen: isControlledOpen,
  onToggleButtonClick,
  ...rest
}: ChartCardProps) {
  const { theme } = useDarkMode();
  const isControlled = isControlledOpen !== undefined;

  const [isOpen, setIsOpen] = useState(isControlledOpen ?? defaultOpen);
  const [height, setHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const containerRef = useRef<null | HTMLDivElement>(null);
  const headerRef = useRef<null | HTMLDivElement>(null);

  // When the controlled prop changes, update the internal state
  useEffect(() => {
    if (isControlled) {
      setIsOpen(isControlledOpen ?? defaultOpen);
    }
  }, [defaultOpen, isControlled, isControlledOpen]);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [containerRef, headerRef]);

  return (
    <div
      className={cx(
        getContainerStyles(theme, height, headerHeight),
        className,
        isOpen && 'open',
      )}
      ref={containerRef}
      {...rest}
    >
      <div
        className={cx(getHeaderStyles(theme), className)}
        {...rest}
        ref={headerRef}
      >
        <div className={leftInnerContainerStyles}>
          <IconButton
            className={toggleButtonStyles}
            aria-label="Toggle button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              if (!isControlled) {
                setIsOpen(currState => !currState);
              }
              onToggleButtonClick?.(e);
            }}
          >
            <Icon
              glyph="ChevronDown"
              className={cx(toggleIconStyles, isOpen && 'open')}
            />
          </IconButton>
          <Body weight="medium" baseFontSize={BaseFontSize.Body2}>
            {title}
          </Body>
        </div>
        <div>{headerContent}</div>
      </div>
      {children}
    </div>
  );
}
