import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import Card from '@leafygreen-ui/card';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import {
  cardStyle,
  childrenWrapperStyle,
  childrenWrapperTransitionStyle,
  flagTextStyle,
  iconStyle,
  iconThemeStyle,
  iconTransitionStyle,
  summaryHeader,
  summaryStyle,
  summaryTextThemeStyle,
  transitionDuration,
} from './ExpandableCard.styles';
import { ExpandableCardProps } from './ExpandableCard.types';

/**
 * TODO: Description
 */
const ExpandableCard = ({
  title,
  children,
  darkMode: darkModeProp,
  description,
  className,
  defaultOpen = false,
  isOpen: isControlledOpen,
  onClick: onClickProp,
  id: idProp,
  flagText,
  contentClassName,
  ...rest
}: ExpandableCardProps) => {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const isControlled = isControlledOpen !== undefined;

  // Always start open
  const [isOpen, setIsOpen] = useState(isControlledOpen ?? defaultOpen);

  const id = useIdAllocator({ prefix: 'expandable-card', id: idProp });
  const summaryId = useIdAllocator({ prefix: 'expandable-card-summary' });
  const contentId = useIdAllocator({ prefix: 'expandable-card-content' });

  const transitionRef = useRef<null>(null);

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
    <LeafyGreenProvider darkMode={darkMode}>
      <Card className={cx(cardStyle(darkMode), className)} id={id} {...rest}>
        {/* HTML `button` elements can't be used as a grid parent */}
        <div
          role="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={summaryId}
          className={summaryStyle}
          onClick={onClick}
          onKeyPress={onClick}
          tabIndex={-1}
        >
          <span>
            <Subtitle className={summaryHeader}>{title}</Subtitle>
            {flagText && <span className={flagTextStyle}>{flagText}</span>}
          </span>
          {description && (
            <Body className={summaryTextThemeStyle[theme]}>{description}</Body>
          )}

          <Transition
            in={isOpen}
            timeout={transitionDuration}
            nodeRef={transitionRef}
          >
            {state => (
              <IconButton
                // Setting 'as="div"' to avoid nesting interactive components for accessibility
                as="div"
                className={cx(
                  iconStyle,
                  iconThemeStyle[theme],
                  iconTransitionStyle[state],
                )}
                aria-label={`${isOpen ? 'collapse' : 'expand'} card`}
                tabIndex={0}
              >
                <Icon glyph="ChevronUp" size={24} />
              </IconButton>
            )}
          </Transition>
        </div>
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
                contentClassName,
              )}
            >
              <div ref={childrenInnerRef}>{children}</div>
            </div>
          )}
        </Transition>
      </Card>
    </LeafyGreenProvider>
  );
};

ExpandableCard.displayName = 'ExpandableCard';

export default ExpandableCard;
