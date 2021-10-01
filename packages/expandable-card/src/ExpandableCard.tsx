import React, { useEffect, useMemo, useRef, useState } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import { H3, Body } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { Transition, TransitionStatus } from 'react-transition-group';
import { useEffectOnceOnMount } from './useEffectOnceOnMount';

const transitionDuration = 300;

/**
 * Styles
 */

const cardStyle = css`
  display: block;
  width: 100%;
  padding: 24px;
`;

const summaryStyle = css`
  display: grid;
  grid-template-columns: auto 24px;
  cursor: pointer;
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
  transition-property: max-height, height, opacity;
  transform-origin: top left;
`;

const childrenWrapperTransitionStyle = (
  state: TransitionStatus,
  height?: number,
): string => {
  switch (state) {
    case 'entering':
      return css`
        max-height: ${height || 1000}px;
      `;
    case 'entered':
      return css`
        max-height: ${height || 1000}px;
      `;
    case 'exiting':
      return css`
        max-height: 0;
      `;
    case 'exited':
      return css`
        max-height: 0;
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
  description?: string;
  isOpen?: boolean;
  handleToggle?: (isOpen: boolean) => void;
  className?: string;
}

/**
 * Conponent
 */
export default function ExpandableCard({
  children,
  title,
  description,
  className,
  isOpen: isControlledOpen,
  handleToggle: handleToggleProp,
}: ExpandableCardProps) {
  const isControlled = isControlledOpen !== undefined;

  // Always start open
  const [isOpen, setIsOpen] = useState(isControlledOpen ?? false);

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
  const childrenRef = useRef<HTMLDivElement>(null);
  const childrenWrapperRef = useRef<HTMLDivElement>(null);

  const [childrenHeight, setChildrenHeight] = useState(0);

  const updateHeight = () => {
    if (childrenRef && childrenRef.current) {
      setChildrenHeight(childrenRef.current.offsetHeight);
    }
  };
  useEffect(
    updateHeight,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, childrenRef, childrenRef.current],
  );

  return (
    <Card className={cx(cardStyle, className)}>
      <div
        role="button"
        className={summaryStyle}
        onClick={handleToggle}
        onKeyPress={handleToggle}
        tabIndex={0}
      >
        <H3>{title}</H3>
        {description && <Body>{description}</Body>}

        <Transition in={isOpen} timeout={transitionDuration}>
          {state => (
            <Icon
              className={cx(iconStyle, iconTransitionStyle[state])}
              glyph="ChevronDown"
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
            ref={childrenWrapperRef}
            className={cx(
              childrenWrapperStyle,
              childrenWrapperTransitionStyle(state, childrenHeight),
            )}
          >
            <div ref={childrenRef}>{children}</div>
          </div>
        )}
      </Transition>
    </Card>
  );
}
