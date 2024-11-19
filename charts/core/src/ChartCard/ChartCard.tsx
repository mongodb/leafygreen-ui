import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { BaseHeader, TitleVariant } from '../BaseHeader';

import { getHeaderStyles, getWrapperStyles } from './ChartCard.styles';
import { ChartCardProps } from './ChartCard.types';

/**
 * Wrapper component that contains charts and can expand and collapse.
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
        getWrapperStyles(theme, height, headerHeight),
        className,
        isOpen && 'open',
      )}
      ref={containerRef}
      {...rest}
    >
      <BaseHeader
        titleProps={{
          value: title,
          variant: TitleVariant.Primary,
        }}
        toggleButtonProps={{
          show: true,
          onClick: (e: MouseEvent<HTMLButtonElement>) => {
            if (!isControlled) {
              setIsOpen(currState => !currState);
            }
            onToggleButtonClick?.(e);
          },
          isOpen,
        }}
        headerContent={headerContent}
        className={getHeaderStyles()}
        ref={headerRef}
      />
      {children}
    </div>
  );
}
