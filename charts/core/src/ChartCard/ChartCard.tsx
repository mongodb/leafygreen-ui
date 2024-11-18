import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator, usePrevious } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { BaseHeader, LabelVariants } from '../BaseHeader';

import {
  childrenWrapperStyle,
  childrenWrapperTransitionStyle,
  getWrapperStyles,
  transitionDuration,
} from './ChartCard.styles';
import { ChartCardProps } from './ChartCard.types';

export function ChartCard({
  children,
  className,
  label,
  headerContent,
  defaultOpen = false,
  isOpen: isControlledOpen,
  onClick: onClickProp,
  ...rest
}: ChartCardProps) {
  const { theme } = useDarkMode();

  const isControlled = isControlledOpen !== undefined;

  // Always start open
  const [isOpen, setIsOpen] = useState(isControlledOpen ?? defaultOpen);

  const summaryId = useIdAllocator({ prefix: 'expandable-card-summary' });
  const contentId = useIdAllocator({ prefix: 'expandable-card-content' });

  const previousDefaultOpen = usePrevious(defaultOpen);

  useEffect(() => {
    if (previousDefaultOpen !== defaultOpen) {
      setIsOpen(defaultOpen);
    }
  }, [defaultOpen, previousDefaultOpen]);

  // When the controlled prop changes, update the internal state
  useEffect(() => {
    if (isControlled) {
      setIsOpen(isControlledOpen ?? defaultOpen);
    }
  }, [defaultOpen, isControlled, isControlledOpen]);

  // If the component is not controlled, we update the internal state on toggle
  const onClick = (
    e: React.SyntheticEvent<HTMLDivElement, MouseEvent | KeyboardEvent>,
  ) => {
    if (!isControlled) {
      console.log(!isOpen);
      setIsOpen(!isOpen);
    }
    onClickProp?.(e);
  };

  // Keep track of the children wrapper
  const childrenInnerRef = useRef<HTMLDivElement>(null);
  const childrenWrapperRef = useRef<HTMLDivElement>(null);

  const [childrenHeight, setChildrenHeight] = useState(0);

  const updateHeight = () => {
    if (childrenInnerRef && childrenInnerRef.current) {
      setChildrenHeight(childrenInnerRef.current.offsetHeight);
    }
  };
  useEffect(
    updateHeight,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, childrenInnerRef, childrenInnerRef.current],
  );

  return (
    <div className={cx(getWrapperStyles(theme), className)} {...rest}>
      <BaseHeader
        labelProps={{
          value: label,
          variant: LabelVariants.Primary,
        }}
        openButtonProps={{
          show: true,
          onClick: onClick,
          isOpen,
        }}
        headerContent={headerContent}
      />
      <Transition
        in={isOpen}
        timeout={transitionDuration}
        nodeRef={childrenWrapperRef}
        onEntered={updateHeight}
      >
        {state => (
          <div
            role="region"
            id={contentId}
            aria-labelledby={summaryId}
            ref={childrenWrapperRef}
            className={cx(
              childrenWrapperStyle,
              childrenWrapperTransitionStyle(state, childrenHeight),
            )}
          >
            <div ref={childrenInnerRef}>{children}</div>
          </div>
        )}
      </Transition>
      {children}
    </div>
  );
}
