import React, { cloneElement, forwardRef, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  bottomInterceptStyles,
  contentScrollContainerStyles,
  getContentWrapperStyles,
  getInnerContainerStyles,
  getOuterContainerStyles,
  referenceWrapperStyles,
  triggerWrapperStyles,
} from './ContextDrawer.styles';
import { ContextDrawerProps } from './ContextDrawer.types';

export const ContextDrawer = forwardRef<HTMLDivElement, ContextDrawerProps>(
  (
    {
      className,
      content,
      darkMode: darkModeProp,
      defaultOpen = false,
      expandedHeight = 160,
      isOpen: controlledIsOpen,
      onOpenChange,
      reference,
      trigger,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { value: isOpen, updateValue } = useControlledValue(
      controlledIsOpen,
      onOpenChange,
      defaultOpen,
    );

    const contentRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { ref: topInterceptRef, inView: isTopInView } = useInView({
      root: scrollContainerRef.current,
      threshold: 0,
    });
    const { ref: bottomInterceptRef, inView: isBottomInView } = useInView({
      root: scrollContainerRef.current,
      threshold: 0,
    });

    const contentId = useIdAllocator({ prefix: 'lg-context_drawer-content' });
    const triggerId = useIdAllocator({
      prefix: 'lg-context_drawer-trigger',
      id: typeof trigger !== 'function' ? trigger.props.id : undefined,
    });

    /**
     * User-friendly enhancement to move focus to panel when it opens.
     */
    useEffect(() => {
      if (!isOpen || contentRef.current === null) {
        return;
      }
      contentRef.current.focus();
    }, [isOpen]);

    const handleTriggerClick = (e: React.MouseEvent) => {
      updateValue(!isOpen, contentRef);

      if (typeof trigger !== 'function' && trigger.props.onClick) {
        trigger.props.onClick(e);
      }
    };

    const renderTrigger = () => {
      const triggerEl =
        typeof trigger === 'function' ? trigger({ isOpen: !!isOpen }) : trigger;

      return cloneElement(triggerEl, {
        id: triggerId,
        onClick: handleTriggerClick,
        'aria-expanded': isOpen,
        'aria-controls': contentId,
      });
    };

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={getOuterContainerStyles({ className })}
          ref={fwdRef}
          {...rest}
        >
          <div className={getInnerContainerStyles({ theme })}>
            <div className={referenceWrapperStyles}>{reference}</div>
            <div
              aria-labelledby={triggerId}
              className={getContentWrapperStyles({
                hasBottomShadow: !isBottomInView,
                hasTopShadow: !isTopInView,
                height:
                  typeof expandedHeight === 'number'
                    ? `${expandedHeight}px`
                    : expandedHeight,
                isOpen: !!isOpen,
                theme,
              })}
              id={contentId}
              ref={contentRef}
              role="region"
              tabIndex={-1}
            >
              <div
                className={contentScrollContainerStyles}
                ref={scrollContainerRef}
              >
                {/* Empty span element used to track if container can scroll up */}
                <span ref={topInterceptRef} />
                {content}
                {/* Empty span element used to track if container can scroll down */}
                <span
                  className={bottomInterceptStyles}
                  ref={bottomInterceptRef}
                />
              </div>
            </div>
          </div>
          <div className={triggerWrapperStyles}>{renderTrigger()}</div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

ContextDrawer.displayName = 'ContextDrawer';
