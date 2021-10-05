import React, { useEffect, useRef, useState } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import { H3, Body } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { Transition, TransitionStatus } from 'react-transition-group';
import { uiColors } from '@leafygreen-ui/palette';
import { useIdAllocator } from '@leafygreen-ui/hooks';

const transitionDuration = 300;

/**
 * Styles
 */

const cardStyle = (darkMode: boolean) => css`
  --card-divider-color: ${darkMode ? uiColors.gray.base : uiColors.gray.light2};
  display: block;
  width: 100%;
`;

const summaryStyle = css`
  display: grid;
  grid-template-columns: auto 24px;
  cursor: pointer;
  padding: 24px;
  color: inherit;

  > * {
    color: inherit;
  }
`;

const flagTextStyle = css`
  font-style: italic;
  font-size: 12px;
  letter-spacing: 0.2px;

  &::before {
    content: ' (';
  }
  &::after {
    content: ')';
  }
`;

const iconStyle = css`
  grid-column: 2;
  grid-row: 1/3;
  align-self: center;
  transition: transform ${transitionDuration}ms ease-in-out;
`;

const iconTransitionStyle: { [key in TransitionStatus]: string } = {
  entering: css`
    transform: rotate(180deg);
  `,
  entered: css`
    transform: rotate(180deg);
  `,
  exiting: css`
    transform: rotate(0deg);
  `,
  exited: css`
    transform: rotate(0deg);
  `,
  unmounted: '',
};

const childrenWrapperStyle = css`
  overflow: hidden;
  transition: ${transitionDuration}ms ease-in-out;
  transition-property: all;
  transform-origin: top left;
  padding-inline: 24px;
  box-sizing: content-box;
  border-top: 1px solid transparent;
  visibility: visible;
`;

const childrenWrapperTransitionStyle = (
  state: TransitionStatus,
  height?: number,
): string => {
  switch (state) {
    case 'entering':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'entered':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'exiting':
      return css`
        max-height: 0;
        padding-block: 0;
      `;
    case 'exited':
      return css`
        max-height: 0;
        padding-block: 0;
        visibility: hidden;
      `;
    default:
      return ``;
  }
};

/**
 * Types
 */
interface ExpandableCardProps {
  title: string;
  children?: React.ReactNode;
  darkMode?: boolean;
  description?: string;
  isOpen?: boolean;
  handleToggle?: (isOpen: boolean) => void;
  className?: string;
  id?: string;
  flagText?: 'optional' | 'required' | string;
}

/**
 * Conponent
 */
export default function ExpandableCard({
  title,
  children,
  darkMode = false,
  description,
  className,
  isOpen: isControlledOpen,
  handleToggle: handleToggleProp,
  id: idProp,
  flagText,
}: ExpandableCardProps) {
  const isControlled = isControlledOpen !== undefined;

  // Always start open
  const [isOpen, setIsOpen] = useState(isControlledOpen ?? false);

  const id = useIdAllocator({ prefix: 'expandable-card', id: idProp });
  const summaryId = useIdAllocator({ prefix: 'expandable-card-summary' });
  const contentId = useIdAllocator({ prefix: 'expandable-card-content' });

  // When the controlled prop changes, update the internal state
  useEffect(() => {
    if (isControlled) {
      console.log(`Effect setting isOpen to: ${isControlledOpen ?? false} `);
      setIsOpen(isControlledOpen ?? false);
    }
  }, [isControlled, isControlledOpen]);

  const handleToggle = () => {
    if (!isControlled) {
      setIsOpen(!isOpen);
    }
    handleToggleProp?.(!isOpen);
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
    <Card
      darkMode={darkMode}
      className={cx(cardStyle(darkMode), className)}
      id={id}
    >
      <div
        role="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={summaryId}
        className={summaryStyle}
        onClick={handleToggle}
        onKeyPress={handleToggle}
        tabIndex={0}
      >
        <span>
          <H3
            className={css`
              display: inline-block;
            `}
          >
            {title}
          </H3>
          {flagText && <span className={flagTextStyle}>{flagText}</span>}
        </span>
        {description && <Body>{description}</Body>}

        <Transition in={isOpen} timeout={transitionDuration}>
          {state => (
            <Icon
              className={cx(iconStyle, iconTransitionStyle[state])}
              glyph="ChevronUp"
            />
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
            )}
          >
            <div ref={childrenInnerRef}>{children}</div>
          </div>
        )}
      </Transition>
    </Card>
  );
}
